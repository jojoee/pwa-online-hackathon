/* global Image */

(function() {

  /** @type {Array.Image} */
  var resourceCache = {};

  /** @type {Array.function} */
  var readyCallbacks = [];

  /**
   * @param {Array.string} imageUrls
   */
  function load(imageUrls) {
    if (imageUrls.length <= 0) {
      readyCallbacks.forEach(function(func) {
        func();
      });

    } else {
      imageUrls.forEach(function(url) {
        if (resourceCache[url]) {
          return resourceCache[url];

        } else {
          // reset
          resourceCache[url] = false;

          var img = new Image();
          img.onload = function() {
            resourceCache[url] = img;
            if (isReady()) {
              readyCallbacks.forEach(function(func) {
                func();
              });
            }
          };
          img.src = url;
        }
      });
    }
  };

  /**
   * @param {string}
   * @returns {Image}
   */
  function get(url) {
    return resourceCache[url];
  };

  /**
   * @returns {boolean}
   */
  function isReady() {
    for (var k in resourceCache) {
      if (resourceCache.hasOwnProperty(k) &&
        !resourceCache[k]) {
        return false;
      }
    }

    return true;
  };

  /**
   * @param {function} func
   */
  function onReady(func) {
    readyCallbacks.push(func);
  };

  window.Resource = {
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady,
  };
})();
