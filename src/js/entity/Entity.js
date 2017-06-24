/* global width, height, ctx, chance, Util */
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

// n stable
// need to fade in
class WeatherEntity extends GameEntity {

  constructor(x, y) {
    super(x, y);
    this.opacity = 0;
    this.stateKey = {
      fadeIn: 1,
      fadeOut: 2,
    }
    this.state = this.stateKey.fadeIn;
  }

  update(dt) {
    // state
    switch (this.state) {
      case this.stateKey.fadeIn:
        this.opacity += 0.005;
        if (this.opacity >= 1) {
          this.opacity = 1;
        }
        break;
      case this.stateKey.fadeOut:
        this.opacity -= 0.01;
        if (this.opacity <= 0) {
          this.opacity = 0;
        }
        break;
      default:
        break;
    }
  }

  fadeOut() {
    this.state = this.stateKey.fadeOut;
  }
}

// randomly occurred
class XWeatherEntity extends GameEntity {

}

class Snow extends WeatherEntity {

  constructor() {
    var x = chance.integer({ min: 0, max: width }),
      y = chance.integer({ min: -height / 2, max: 0 }),
      vecX = chance.floating({ min: -0.5, max: 3.0 }),
      vecY = chance.floating({ min: 1.0, max: 3.0 }),
      radius = chance.floating({ min: 0.5, max: 3.0 });

    super(x, y);
    this.vel = new Vector(vecX, vecY);
    this.radius = radius;
  }

  update(dt) {
    super.update(dt);
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // out of screen
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.pos.x = chance.integer({ min: 0, max: width });
    }
  }

  render() {
    super.render();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(238, 238, 238, ' + this.opacity + ')';
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

class Star extends WeatherEntity {

  constructor() {
    var x = chance.integer({ min: 0, max: width }),
      y = chance.integer({ min: 0, max: height });

    super(x, y);
    this.radius = 0;
  }

  setVelByRad(rad) {
    var mag = Util.getMagnitude(this.vel);

    this.vel.x = Math.cos(rad) * mag;
    this.vel.y = Math.sin(rad) * mag;
  }

  setVelByMag(mag) {
    var rad = Util.getRadian(this.vel);

    this.vel.x = Math.cos(rad) * mag;
    this.vel.y = Math.sin(rad) * mag;
  }

  update(dt) {
    super.update(dt);
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  render() {
    super.render();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 221, 157, ' + this.opacity + ')';
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
