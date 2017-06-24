/* global Position */

class Util {

  static add(a, b) {
    return a + b;
  }

  static del(a, b) {
    return a - b;
  }

  /**
   * Return a number of distance between 2 point
   *
   * @param {Position} pos1
   * @param {Position} pos2
   * @returns {number}
   */
  static getDistance(pos1, pos2) {
    var dx = pos1.x - pos2.x,
      dy = pos1.y - pos2.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * @param {Vector} vec
   * @returns {number}
   */
  static getMagnitude(vec) {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  }

  /**
   * Get rotation between
   *
   * @see https://gist.github.com/conorbuck/2606166
   *
   * @param {Position} p1
   * @param {Position} [p2=new Position(0, 0)]
   * @returns {number}
   */
  static getRadian(p1, p2 = new Position(0, 0)) {
    // if (typeof p2 === 'undefined') p2 = new Position(0, 0);
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  }

  static getDegree(p1, p2) {
    return this.getRadian(p1, p2) * 180 / Math.PI;
  }

  /**
   * Get current UTC timestamp
   *
   * @see http://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
   *
   * @returns {number}
   */
  static getCurrentUtcTimestamp() {
    return Date.now();
  }
};

// hack
if (typeof module !== 'undefined' && module.exports != null) {
  module.exports = Util;
}
