var Util = require('./Util'),
  chai = require('chai'),
  expect = chai.expect;

describe('Test', function() {
  it('Mocha and Chai should work', function() {
    expect(true).to.be.true;
    expect(false).to.be.false;

    expect(Util.add(1, 2)).equal(3);
    expect(Util.del(1, 2)).equal(-1);
  });
});
