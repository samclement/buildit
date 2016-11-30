const assert = require('assert')
const URL = require('url')
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
  describe('#isHashLink', function() {
    it(`should return true if the link starts with a '#'`, function() {
      assert.equal(utils.isHashLink('#'), true)
    })
    it(`should return false if the link starts with a 'http://'`, function() {
      assert.equal(utils.isHashLink('http://www.google.com'), false)
    })
  })
  describe('#normalizeLink', function() {
    it(`should return 'http://www.topshop.com/test' when provided with parsedUlr and '/test'`, function() {
      const parsedUrl = URL.parse('http://www.topshop.com')
      assert.equal(utils.normalizeLink('/test', parsedUrl), 'http://www.topshop.com/test')
    })
  })
})
