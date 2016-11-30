const test = require('tape')
const Url = require('url')
const utils = require('../lib/utils')

test('isInternalLink', (t) => {
  const slash = '/'
  const relativePath = '../'
  const resource = 'abc'
  const testUrl = 'http://www.test.com'
  const googleUrl = 'http://www.google.com'
  t.plan(5)
  t.equal(utils.isInternalLink(slash, 'www.google.com'), true, `should return true when link has no prepending protocol: '${slash}'`)
  t.equal(utils.isInternalLink(relativePath, 'www.google.com'), true, `should return true when link is relative: '${relativePath}'`)
  t.equal(utils.isInternalLink(resource, 'www.google.com'), true, `should return true when link is current directory: '${resource}'`)
  t.equal(utils.isInternalLink(testUrl, googleUrl), false, `should return false when link and hostname do not match: '${testUrl}', '${googleUrl}'`)
  t.equal(utils.isInternalLink(googleUrl, googleUrl), true, `should return true when link and hostname match: '${googleUrl}', '${googleUrl}'`)
})

test('isHashLink', (t) => {
  const hash = '#'
  const googleUrl = 'http://www.google.com'
  const protocol = 'http://'
  t.plan(2)
  t.equal(utils.isHashLink(hash), true, `should return true if the link starts with a '${hash}'`)
  t.equal(utils.isHashLink(googleUrl), false, `should return false if the link starts with a '${protocol}'`)
})

test('normalizeLink', (t) => {
  const path = '/test'
  const parsedUrl = Url.parse('http://www.topshop.com')
  t.plan(3)
  t.equal(utils.normalizeLink(path, parsedUrl), `http://www.topshop.com${path}`, `should return 'http://www.topshop.com${path}' when provided with parsedUlr and '${path}'`)
  t.equal(utils.normalizeLink('/foo/bar?test=1', parsedUrl), 'http://www.topshop.com/foo/bar', `should remove query string from links`)
  t.equal(utils.normalizeLink(`http://www.topshop.com${path}`, parsedUrl), `http://www.topshop.com${path}`, `should not change valid URI with no query string`)
})
