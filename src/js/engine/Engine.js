/* eslint no-unused-vars: 0 */
/* global Resource, boot, create, update, render, assetUrls */

var Engine = (function() {

  var lastTime;

  function coreBoot() {
    boot();
  }

  function coreLoad() {
    Resource.onReady(coreInit);
    Resource.load(assetUrls);
  }

  function coreInit() {
    lastTime = Date.now();
    coreCreate();
    coreRender();
    coreGameLoop();
  }

  function coreCreate() {
    create();
  }

  function coreGameLoop() {
    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;

    coreUpdate(dt);
    coreRender(dt);
    lastTime = now;
    window.requestAnimationFrame(coreGameLoop);
  }

  function coreUpdate(dt) {
    update(dt);
  }

  function coreRender(dt) {
    render(dt);
  }

  coreBoot();
  coreLoad();

})(this);
