/* global Position */
/* eslint no-unused-vars: 0 */

// Engine required
var c = document.createElement('canvas'),
  ctx = c.getContext('2d'),
  canvasWidth = 800,
  canvasHeight = 800,
  assetUrls = [];

// Game
var entities = [];

function handleInput(keyCode) {

}

function handleClick(e) {

}

function boot() {
  c.width = canvasWidth;
  c.height = canvasHeight;
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
