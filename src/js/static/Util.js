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

  /**
   * Get random integer number
   *
   * @see https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
   *
   * @param {number} min
   * @param {number} max
   * @returns {number} integer number
   */
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Get random boolean with likelihood
   *
   * @see https://stackoverflow.com/questions/36756331/js-generate-random-boolean
   *
   * @param {number} [likelihood=100]
   * @returns {boolean}
   */
  static getRandomBoolean(likelihood = 100) {
    return Math.random() <= (likelihood / 100);
  }
};

// hack
if (typeof module !== 'undefined' && module.exports != null) {
  module.exports = Util;
}
