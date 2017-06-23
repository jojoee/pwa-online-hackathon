var chai = require('chai'),
  expect = chai.expect;

var app = require('./util');

describe('Test', function() {
  it('Mocha and Chai should work', function() {
    expect(true).to.be.true;
    expect(false).to.be.false;

    expect(app.add(1, 2)).equal(3);
    expect(app.del(1, 2)).equal(-1);
  });
});
