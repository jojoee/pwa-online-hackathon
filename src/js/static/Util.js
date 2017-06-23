var Util = {
  add: function(a, b) {
    return a + b;
  },

  del: function(a, b) {
    return a - b;
  }
};

if (typeof module !== 'undefined' && module.exports != null) {
  module.exports = Util;
}
