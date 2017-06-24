/* global Position, _, GameEntity, chance, Snow */
/* eslint no-unused-vars: 0 */

// Engine required
var c = document.createElement('canvas'),
  ctx = c.getContext('2d'),
  width,
  height,
  assetUrls = [];

// Game
var entities = [];

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
}

/* ================================================================ Engine
*/

function boot() {
  updateCanvasSize();
  document.body.appendChild(c);
  c.style.backgroundColor = '#1d1d1d';
}

function create() {
  var i = 0;

  c.addEventListener('click', handleClick);
  document.addEventListener('keyup', function(e) {
    handleInput(e.keyCode);
  });
}

function update(dt) {

}

function render(dt) {
  var fps = (1 / dt).toFixed(2),
    i = 0;

  // clear
  ctx.clearRect(0, 0, c.width, c.height);

  // main

  // meta
  ctx.font = 'bold 16px Monospace';
  ctx.fillStyle = '#fff';
  ctx.fillText('FPS:' + fps, 10, 26);
}
