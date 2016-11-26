const assert = require('assert')
const utils = require('../lib/utils')

describe('utils', function() {
  describe('#isInternalLink', function() {
    it(`should return true when link has no prepending protocol: '/'`, function() {
      assert.equal(utils.isInternalLink('/', 'www.google.com'), true)
    })
    it(`should return true when link is relative: '../'`, function() {
      assert.equal(utils.isInternalLink('../', 'www.google.com'), true)
    })
    it(`should return true when link is current directory: 'abc'`, function() {
      assert.equal(utils.isInternalLink('abc', 'www.google.com'), true)
    })
    it(`should return false when link and hostname do not match: 'http://www.test.com', 'www.google.com'`, function() {
      assert.equal(utils.isInternalLink('http://www.test.com', 'www.google.com'), false)
    })
    it(`should return true when link and hostname match: 'http://www.google.com', 'www.google.com'`, function() {
      assert.equal(utils.isInternalLink('http://www.google.com', 'www.google.com'), true)
    })
  })
})
