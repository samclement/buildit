const assert = require('assert')
const crawler = require('../lib/crawler')

describe('crawler', function() {
  describe('#constructor()', function() {
    it(`should throw an error if passed an 'f' character`, function() {
      assert.throws(() => { crawler('f') }, /Not a valid url/, Error)
    })
    it(`should throw an error if passed a '/'`, function() {
      assert.throws(() => { crawler('/') }, /Not a valid url/, Error)
    })
    it(`should not throw an error if passed a valid url: 'http://www.google.com'`, function() {
      assert.doesNotThrow(() => { crawler('http://www.google.com') }, /Not a valid url/, Error)
    })
  })
})
