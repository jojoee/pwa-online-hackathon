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
class GameEntityInterface {

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

/* ================================================================ Weather
*/

class StarWeather extends GameEntityInterface {

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

/* ================================================================ Main
*/

class Meteor extends GameEntityInterface {

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

class BombEffect extends GameEntityInterface {

  constructor(x, y, radius) {
    super(x, y);
    this.opacity = 0.2;
    this.state = this.stateKey.fadeOut;

    // specific
    this.radius = radius;
  }

  update(dt) {
    super.update(dt);
    this.radius -= 1;
  }

  render() {
    super.render();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 221, 157, ' + this.opacity + ')';
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

class PointEffect extends GameEntityInterface {

  constructor(point) {
    var x = (width / 2) + chance.integer({ min: -10, max: 10 }),
      y = 162;

    super(x, y);
    this.opacity = 1;
    this.state = this.stateKey.fadeOut;

    // specific
    this.point = point;
  }

  update(dt) {
    super.update();
    this.pos.y -= 1;
  }

  render() {
    super.render();
    ctx.font = 'bold 16px Monospace';
    ctx.fillStyle = 'rgba(238, 255, 35, ' + this.opacity + ')';
    ctx.textAlign = 'left';
    ctx.fillText('+' + this.point, this.pos.x, this.pos.y);
  }
}

/* ================================================================ Message
*/

// immortal entity
class GameMessage extends GameEntityInterface {

  constructor(name) {
    super(0, 0);
    this.opacity = 0;
    this.state = this.stateKey.dead;

    // specific
    this.name = name;
    this.message = '';
  }

  updatePosition(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  echo(message) {
    this.opacity = 0;
    this.state = this.stateKey.fadeIn;
    this.message = message;
  }

  update(dt) {
    super.update(dt);
    if (this.opacity >= 1) {
      this.state = this.stateKey.fadeOut;
    }
  }

  render() {
    if (this.isDead()) return;

    super.render();
    ctx.font = 'bold 16px Monospace';
    ctx.fillStyle = 'rgba(180, 180, 180, ' + this.opacity + ')';
    ctx.textAlign = 'left';
    ctx.fillText(this.name + ' says: ' + this.message, this.pos.x, this.pos.y);
  }
}

class StarLordMessage extends GameMessage {

  constructor() {
    super('Galaxy');
    this.updatePosition();
  }

  updatePosition() {
    var x = 10,
      y = height - 10;
    super.updatePosition(x, y);
  }
}
