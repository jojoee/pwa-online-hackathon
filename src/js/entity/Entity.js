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

/* ================================================================ Game
*/

// @todo this should be interface
class GameEntity {

  constructor(x, y) {
    this.pos = new Position(x, y);
    this.vel = new Vector(0, 0);
    this.rad = 0;
    this.opacity = 1;
    this.stateKey = {
      fadeIn: 1,
      fadeOut: 2,
      dead: 3,
      stable: 4,
    };
    this.state = this.stateKey.stable;
  }

  render() {

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
          this.state = this.stateKey.dead;
        }
        break;
      case this.stateKey.dead:
        break;
      case this.stateKey.stable:
        break;
      default:
        break;
    }
  }

  fadeOut() {
    this.state = this.stateKey.fadeOut;
  }

  isFadeIn() {
    return this.state === this.stateKey.fadeIn;
  }

  isFadeOut() {
    return this.state === this.stateKey.fadeOut;
  }

  isDead() {
    return this.state === this.stateKey.dead;
  }
}

/* ================================================================ Star
*/

// @todo this should be interface
class StarEntity extends GameEntity {

  constructor(x, y) {
    super(x, y);
    this.opacity = 0;
    this.state = this.stateKey.stable;
  }

  update(dt) {
    super.update(dt);
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
}

class Star extends StarEntity {

  constructor() {
    var x = chance.integer({ min: 0, max: width }),
      y = chance.integer({ min: 0, max: height });

    super(x, y);
    this.opacity = 0;
    this.state = this.stateKey.fadeIn;

    // specific
    this.radius = 0;
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

class Meteor extends StarEntity {

  constructor(x, y) {
    super(x, y);
    this.opacity = 1;
    this.state = this.stateKey.stable;

    // specific
    this.tailLength = 5;
    this.trailLengthDt = 0;
    // @todo update naming
    this.isCounted = false;
  }

  update(dt) {
    super.update(dt);
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.trailLengthDt += 0.01;

    if (this.state === this.stateKey.stable &&
      (this.pos.x < -0.2 * width || this.pos.y > 1.2 * height)) {
      this.state = this.stateKey.fadeOut;
    }
  }

  render() {
    var x = this.pos.x,
      y = this.pos.y,
      currentTrailLength = 200 * this.trailLengthDt,
      rad = Util.getRadian(this.vel),
      tailPosX = x + currentTrailLength * Math.cos(rad),
      tailPosY = y + currentTrailLength * Math.sin(rad),
      tailPos = new Position(tailPosX, tailPosY);

    // main
    ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
    ctx.beginPath();
    ctx.moveTo(x - 1, y + 1);
    ctx.lineTo(x, y + this.tailLength);
    ctx.lineTo(x + 1, y + 1);
    ctx.lineTo(x + this.tailLength, y);
    ctx.lineTo(x + 1, y - 1);
    ctx.lineTo(x, y + 1);
    ctx.lineTo(x, y - this.tailLength);
    ctx.lineTo(x - 1, y - 1);
    ctx.lineTo(x - this.tailLength, y);
    ctx.lineTo(x - 1, y + 1);
    ctx.lineTo(x - this.tailLength, y);
    ctx.closePath();
    ctx.fill();

    // trail
    ctx.fillStyle = 'rgba(255, 221, 157, ' + this.opacity + ')';
    ctx.beginPath();
    ctx.moveTo(x - 1, y - 1);
    ctx.lineTo(tailPos.x, tailPos.y);
    ctx.lineTo(x + 1, y + 1);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * @returns {boolean}
   */
  isPassBoundary() {
    return this.pos.x < 0 || this.pos.y > height;
  }
}

/* ================================================================ Effect
*/

class Bomb extends GameEntity {

  constructor(x, y, radius) {
    super(x, y);
    this.opacity = 0.2;
    this.state = this.stateKey.fadeOut;

    // specific
    this.radius = radius;
  }

  update(dt) {
    super.update(dt);
  }

  render() {
    super.render();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 221, 157, ' + this.opacity + ')';
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
