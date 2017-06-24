/* global Position, _, GameEntity, chance, Snow, Star, Util, firebase */
/* eslint no-unused-vars: 0 */

// Engine required
var c = document.createElement('canvas'),
  ctx = c.getContext('2d'),
  width,
  height,
  assetUrls = [];

// Game
const isDebug = true,
  delay = {
    weather: 10000,
  };

var entities = [],
  weatherEntities = [],
  config = {
    currentWeather: 1,
  },
  timestamp = {
    weather: Util.getCurrentUtcTimestamp() - delay.weather,
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

function handleInput(keyCode) {

}

function handleClick(e) {
}

// https://davidwalsh.name/javascript-debounce-function
// https://css-tricks.com/debouncing-throttling-explained-examples/
// https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
window.addEventListener('resize', _.debounce(function() {
  updateCanvasSize();
}, 200));

/* ================================================================ Canvas
*/

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

/* ================================================================ Engine
*/

function boot() {
  updateCanvasSize();
  document.body.appendChild(c);
  c.style.backgroundColor = '#505050';
}

function create() {
  var i = 0;

  c.addEventListener('click', handleClick);
  document.addEventListener('keyup', function(e) {
    handleInput(e.keyCode);
  });
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
    if (weatherEntities[i].opacity <= 0) {
      weatherEntities.splice(i--, 1);
    }
  }
}

function render(dt) {
  var fps = (1 / dt).toFixed(2),
    i = 0;

  // clear
  ctx.clearRect(0, 0, c.width, c.height);

  // weather entities
  for (i = 0; i < weatherEntities.length; i++) {
    weatherEntities[i].render();
  }

  // meta for debug
  if (isDebug) {
    var metaX = 10,
      metaY = 10;
    var fadeOutWeatherEntities = weatherEntities.filter(function(entity) {
      return entity.opacity <= 0;
    })
    ctx.font = 'bold 16px Monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText('FPS:' + fps, metaX, metaY += 16);
    ctx.fillText('nWeatherEntities:' + weatherEntities.length, metaX, metaY += 16);
    ctx.fillText('nFadeOutWeatherEntities:' + fadeOutWeatherEntities.length, metaX, metaY += 16);
  }
}
