/* eslint no-unused-vars: 0 */

class Position {

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Vector extends Position {

}

class Color {

  /**
   * @param {number} r integer number between 0 - 255
   * @param {number} g integer number between 0 - 255
   * @param {number} b integer number between 0 - 255
   * @param {number} a integer number between 0 - 255
   */
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

class GameEntity {

  constructor(x, y) {
    this.pos = new Position(x, y);
    this.vel = new Vector(0, 0);
    this.rad = 0;
  }

  render() {

  }

  update(dt) {

  }
}
