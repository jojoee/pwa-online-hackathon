/* global Position, _, GameEntity, chance, Meteor, Star, Util, firebase */
/* eslint no-unused-vars: 0 */

// Engine required
var c = document.createElement('canvas'),
  ctx = c.getContext('2d'),
  width,
  height,
  assetUrls = [];

// Game const
const isDebug = true,
  delay = {
    weather: 10000,
  };

// Game animation support
var weatherEntities = [];

// Game var
var meteors = [],
  isGameOver = false,
  life,
  point,
  timestamp = {
    weather: 0,
  };

// firebase
var firebaseConfig = {
  apiKey: 'AIzaSyDN74C2v5IE6lPzAzGQ1aGQ6MQNujvKwKA',
  authDomain: 'pwa-online-hackathon-ae5f6.firebaseapp.com',
  databaseURL: 'https://pwa-online-hackathon-ae5f6.firebaseio.com',
  projectId: 'pwa-online-hackathon-ae5f6',
  storageBucket: 'pwa-online-hackathon-ae5f6.appspot.com',
  messagingSenderId: '390428073562',
};

/* ================================================================ Firebase
*/

firebase.initializeApp(firebaseConfig);

/* ================================================================ Weather
*/

function addStarWeather() {
  var i = 0,
    j = 0,
    starLayers = [
      {
        starSpeed: 0.015,
        starRadius: 0.4,
        nStars: 320,
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
      var entity = new Star();

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

/* ================================================================ Event
*/

function handleClick(e) {
  var cX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - c.offsetLeft,
    cY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - c.offsetTop,
    mousePos = new Position(cX, cY),
    i = 0;

  if (isGameOver) {
    resetGame();
  }
}

// https://davidwalsh.name/javascript-debounce-function
// https://css-tricks.com/debouncing-throttling-explained-examples/
// https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
window.addEventListener('resize', _.debounce(function() {
  updateCanvasSize();
}, 200));

/* ================================================================ Game util
*/

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

/* ================================================================ Game
*/

function resetGame() {
  meteors = [];
  isGameOver = false;
  life = 1;
  point = 0;
  timestamp = {
    weather: Util.getCurrentUtcTimestamp() - delay.weather,
  };
}

function renderGameOverScreen() {
  var metaY = 100;

  // render
  ctx.font = 'bold 16px Monospace';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText('Press any key to', width / 2, metaY += 16);
  ctx.fillText('continue, point: ' + point, width / 2, metaY += 16);
}

function renderMeta(fps) {
  var metaX = 10,
    metaY = 120;

  ctx.font = 'bold 16px Monospace';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'start';
  ctx.fillText('life:' + life, metaX, metaY += 16);
  ctx.fillText('point:' + point, metaX, metaY += 16);

  if (isDebug) {
    var fadeOutWeatherEntities = weatherEntities.filter(function(entity) {
        return entity.isFadeOut();
      }),
      fadeOutMeteors = meteors.filter(function(entity) {
        return entity.isFadeOut();
      });

    ctx.fillText('FPS:' + fps, metaX, metaY += 16);
    ctx.fillText('nMeteors:' + meteors.length, metaX, metaY += 16);
    ctx.fillText('nWeatherEntities:' + weatherEntities.length, metaX, metaY += 16);
    ctx.fillText('nFadeOutMeteors:' + fadeOutMeteors.length, metaX, metaY += 16);
    ctx.fillText('nFadeOutWeatherEntities:' + fadeOutWeatherEntities.length, metaX, metaY += 16);
  }
}

/* ================================================================ Engine
*/

function boot() {
  updateCanvasSize();
  document.body.appendChild(c);
  c.style.backgroundColor = '#505050';
}

function create() {
  var i = 0;

  this.resetGame();
  c.addEventListener('click', handleClick);
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
      }
    }
  }

  // randomly spam meteor
  // @todo increase spam rate and spam range's width by with player point
  if (!isGameOver) {
    if (chance.bool({ likelihood: 1 })) {
      var x = chance.integer({ min: 0.8 * width, max: 1.2 * width }),
        y = chance.integer({ min: -0.2 * height, max: 0 }),
        meteor = new Meteor(x, y),
        mag = chance.integer({ min: 15, max: 30 }),
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

  // game over
  if (isGameOver) renderGameOverScreen();

  // meta
  renderMeta(fps);
}
