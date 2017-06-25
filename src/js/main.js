/* global Position, _, GameEntity, chance, Meteor, StarWeather, BombEffect, Util, firebase */
/* eslint no-unused-vars: 0 */

// Engine required
var c = document.createElement('canvas'),
  ctx = c.getContext('2d'),
  width,
  height,
  assetUrls = [];

// Game const
const isDebug = true,
  appDefault = {
    userAvatarUrl: '/dist/image/user-avatar.png',
  },
  delay = {
    weather: 10000,
  };

// Game animation support
var weatherEntities = [],
  effectEntities = [];

// Game var
var meteors = [],
  isGameOver = false,
  life,
  score,
  userData = {
    highScore: 0,
  },
  timestamp = {
    weather: 0,
  };

var eleSignInButton = document.getElementById('sign-in'),
  eleSignOutButton = document.getElementById('sign-out'),
  eleUserAvatar = document.getElementById('user-avatar'),
  eleUserDisplayName = document.getElementById('user-display-name');

// firebase
var firebaseScoreRef,
  firebaseFcmTokenRef,
  firebaseAuth,
  firebaseDatabase,
  firebaseMessaging;

/* ================================================================ Firebase
*/

function firebaseCheck() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    console.log('please import Firebase SDK, and config it')
  }
}

function firebaseInit() {
  firebaseAuth = firebase.auth();
  firebaseDatabase = firebase.database();
  firebaseScoreRef = firebase.database().ref('/scores');
  firebaseFcmTokenRef = firebase.database().ref('/fcmTokens');
  firebaseMessaging = firebase.messaging();

  firebaseAuth.onAuthStateChanged(firebaseOnAuthStateChanged);
  firebaseMessaging.onMessage(firebaseOnMessage)
}

function firebaseSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebaseAuth.signInWithPopup(provider);
}

function firebaseSignOut() {
  firebaseAuth.signOut();
}

// save FCM token into db
// (Firebase Messaging Device)
function firebaseSaveFcmToken() {
  // get FCM token
  firebaseMessaging.getToken()
    .then(function(currentToken) {
      if (currentToken) {
        console.log('fcmToken', currentToken);
        firebaseFcmTokenRef
          .child(currentToken)
          .set(firebase.auth().currentUser.uid);

      } else {
        // request notification permission
        firebaseRequestNotificationsPermissions();
      }
    })
    .catch(function(error) {
      console.error('unable to get FCM token.', error);
    });
};

// request permissions to show notifications
function firebaseRequestNotificationsPermissions() {
  console.log('requesting notifications permission...');

  // popup notification on browser
  firebaseMessaging.requestPermission()
    .then(function() {
      firebaseSaveFcmToken();
    })
    .catch(function(error) {
      console.error('unable to get permission to notify', error);
    });
};

/* ================================================================ Firebase listener
*/

function firebaseOnMessage(payload) {
  console.log(payload);
}

// triggers auth state change
// e.g. user signs-in or signs-out
function firebaseOnAuthStateChanged(user) {
  if (user) {
    // update UI
    var userAvatarUrl = user.photoURL || appDefault.userAvatarUrl;
    var userDisplayName = user.displayName;

    eleUserAvatar.style.backgroundImage = 'url(' + userAvatarUrl + ')';
    eleUserDisplayName.textContent = userDisplayName;
    eleUserAvatar.removeAttribute('hidden');
    eleUserDisplayName.removeAttribute('hidden');
    eleSignOutButton.removeAttribute('hidden');
    eleSignInButton.setAttribute('hidden', true);

  } else {
    // update UI
    eleUserAvatar.setAttribute('hidden', 'true');
    eleUserDisplayName.setAttribute('hidden', 'true');
    eleSignOutButton.setAttribute('hidden', 'true');
    eleSignInButton.removeAttribute('hidden');
  }
}

/* ================================================================ Weather
*/

function addStarWeather() {
  var i = 0,
    j = 0,
    starLayers = [
      {
        starSpeed: 0.015,
        starRadius: 0.4,
        nStars: 120,
      },
      {
        starSpeed: 0.03,
        starRadius: 1,
        nStars: 50,
      },
      {
        starSpeed: 0.05,
        starRadius: 1.5,
        nStars: 30,
      }
    ];

  // starts
  for (j = 0; j < starLayers.length; j++) {
    var layer = starLayers[j];

    for (i = 0; i < layer.nStars; i++) {
      var entity = new StarWeather();

      entity.radius = layer.starRadius;
      entity.setVelByMag(layer.starSpeed);
      entity.setVelByRad(2.5);
      weatherEntities.push(entity);
    }
  }
}

// is star should be weather ?
function changeWeather() {
  // @todo need to refactor
  var i = 0;

  // fade out existing entities
  for (i = 0; i < weatherEntities.length; i++) {
    weatherEntities[i].fadeOut();
  }

  addStarWeather();
}

/* ================================================================ Listener
*/

function onCanvasClicked(e) {
  var cX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - c.offsetLeft,
    cY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - c.offsetTop,
    mousePos = new Position(cX, cY),
    killRadius = 120,
    i = 0;

  if (isGameOver) {
    resetGame();

  } else {
    var entity = new BombEffect(mousePos.x, mousePos.y, killRadius);
    effectEntities.push(entity);

    for (i = 0; i < meteors.length; i++) {
      var dist = Util.getDistance(meteors[i].pos, mousePos);

      if (dist < killRadius) {
        // @todo render bomb particles
        score++;
        meteors.splice(i--, 1);
      }
    }
  }
}

function onSignInButtonClicked(e) {
  e.preventDefault();
  firebaseSignIn();
}

function onSignOutButtonClicked(e) {
  e.preventDefault();
  firebaseSignOut();
}

// https://davidwalsh.name/javascript-debounce-function
// https://css-tricks.com/debouncing-throttling-explained-examples/
// https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
window.addEventListener('resize', _.debounce(function() {
  updateCanvasSize();
}, 200));

function initListener() {
  // canvas
  c.addEventListener('click', onCanvasClicked);

  // sign-in, sign-out
  eleSignInButton.addEventListener('click', onSignInButtonClicked);
  eleSignOutButton.addEventListener('click', onSignOutButtonClicked);
}

/* ================================================================ Game
*/

function resetGame() {
  meteors = [];
  isGameOver = false;
  life = 1;
  score = 0;
  timestamp = {
    weather: Util.getCurrentUtcTimestamp() - delay.weather,
  };
}

// resize
function updateCanvasSize() {
  var padding = 0;

  width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - padding;
  height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - padding;
  c.width = width;
  c.height = height;

  // change weather + update timestamp
  changeWeather();
  timestamp.weather = Util.getCurrentUtcTimestamp();
}

/* ================================================================ Game render
*/

function renderGameOverScreen() {
  var metaY = 100;

  // render
  ctx.font = 'bold 16px Monospace';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText('Press any key to', width / 2, metaY += 16);
  ctx.fillText('continue, score: ' + score, width / 2, metaY += 16);
}

function renderMeta(fps) {
  var metaX = 10,
    metaY = 50;

  ctx.font = 'bold 16px Monospace';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'start';
  ctx.fillText('life: ' + life, metaX, metaY += 16);
  ctx.fillText('score: ' + score, metaX, metaY += 16);
  ctx.fillText('high score: ' + userData.highScore, metaX, metaY += 16);

  if (isDebug) {
    var fadeOutWeatherEntities = weatherEntities.filter(function(entity) {
        return entity.isFadeOut();
      }),
      fadeOutMeteors = meteors.filter(function(entity) {
        return entity.isFadeOut();
      });

    ctx.fillText('FPS: ' + fps, metaX, metaY += 16);
    ctx.fillText('nMeteors: ' + meteors.length, metaX, metaY += 16);
    ctx.fillText('nWeatherEntities: ' + weatherEntities.length, metaX, metaY += 16);
    ctx.fillText('nEffectEntities: ' + effectEntities.length, metaX, metaY += 16);
    ctx.fillText('nFadeOutMeteors: ' + fadeOutMeteors.length, metaX, metaY += 16);
    ctx.fillText('nFadeOutWeatherEntities: ' + fadeOutWeatherEntities.length, metaX, metaY += 16);
  }
}

/* ================================================================ Engine
*/

function boot() {
  updateCanvasSize();
  document.body.appendChild(c);
  c.style.backgroundColor = '#505050';

  // app UI
  initListener();

  // firebase
  firebaseCheck();
  firebaseInit();
}

function create() {
  this.resetGame();
}

function update(dt) {
  var i = 0,
    j = 0,
    utc = Util.getCurrentUtcTimestamp();

  // change weather
  if (utc > timestamp.weather + delay.weather) {
    // change weather + update timestamp
    changeWeather();
    timestamp.weather = utc;
  }

  // update weather
  for (i = 0; i < weatherEntities.length; i++) {
    weatherEntities[i].update();

    // remove it, when it gone
    if (weatherEntities[i].isDead()) {
      weatherEntities.splice(i--, 1);
    }
  }

  // meteor
  for (i = 0; i < meteors.length; i++) {
    meteors[i].update();

    if (meteors[i].isDead()) {
      // remove when it gone
      meteors.splice(i--, 1);

    } else if (meteors[i].isPassBoundary() && !meteors[i].isCounted) {
      meteors[i].isCounted = true;
      // reduce life
      life--;
      if (life <= 0) {
        life = 0;
        isGameOver = true;
        userData.highScore = (score > userData.highScore)
          ? score
          : userData.highScore;
      }
    }
  }

  // effect
  for (i = 0; i < effectEntities.length; i++) {
    effectEntities[i].update();
    if (effectEntities[i].isDead()) {
      effectEntities.splice(i--, 1);
    }
  }

  // randomly spam meteor
  // @todo increase spam rate / spam range's width / speed by with player score
  if (!isGameOver) {
    if (chance.bool({ likelihood: 1 })) {
      var x = chance.integer({ min: 0.8 * width, max: 1.2 * width }),
        y = chance.integer({ min: -0.2 * height, max: 0 }),
        meteor = new Meteor(x, y),
        mag = chance.integer({ min: 5, max: 10 }),
        rad = Util.getRadian(new Position(x, -(height + y)));

      meteor.setVelByMag(mag);
      meteor.setVelByRad(rad);
      meteors.push(meteor);
    }
  }
}

function render(dt) {
  var fps = (1 / dt).toFixed(2),
    metaX = 10,
    metaY = 120,
    i = 0;

  // clear
  ctx.clearRect(0, 0, c.width, c.height);

  // weather entities
  for (i = 0; i < weatherEntities.length; i++) {
    weatherEntities[i].render();
  }

  // meteor
  for (i = 0; i < meteors.length; i++) {
    meteors[i].render();
  }

  // effect
  for (i = 0; i < effectEntities.length; i++) {
    effectEntities[i].render();
  }

  // meta
  renderMeta(fps);

  // game over
  if (isGameOver) {
    // render overlay screen
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);

    renderGameOverScreen();
  }
}
