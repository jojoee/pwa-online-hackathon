/* global width, height, ctx, chance */
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
    this.opacity = 1;
  }

  render() {

  }

  update(dt) {

  }
}

class Snow extends GameEntity {

  constructor() {
    var colors = [
        '#eee',
        '#fcfcfc',
        '#f2f2f2',
        '#fff',
      ],
      x = chance.integer({ min: 0, max: width }),
      y = chance.integer({ min: -height, max: 0 }),
      vecX = chance.floating({ min: -0.5, max: 3.0 }),
      vecY = chance.floating({ min: 1.0, max: 3.0 }),
      radius = chance.floating({ min: 0.5, max: 3.0 }),
      color = colors[chance.integer({ min: 0, max: colors.length - 1 })];

    // base
    super(x, y);

    // specific
    this.vel = new Vector(vecX, vecY);
    this.radius = radius;
    this.color = color;
  }

  update(dt) {
    super.update(dt);

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.y > height) {
      this.opacity -= 0.1;
    }
  }

  render() {
    super.render();

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
