const test = require('tape')
const Url = require('url')
const utils = require('../../lib/utils')

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

test('removeDuplicates', (t) => {
  const intArray = [1, 2, 3, 4, 4, 5]
  const strArray = ['a', 'b', 'b', 'c', 'd', 'd', 'e']
  t.plan(2)
  t.deepEqual(intArray.filter(utils.removeDuplicates), [1, 2, 3, 4, 5], `should return array of unique int values`)
  t.deepEqual(strArray.filter(utils.removeDuplicates), ['a', 'b', 'c', 'd', 'e'], `should return an array of unique string values`)
})

test('stripTrailingSlash', (t) => {
  const pathWithTralingSlash = '/test/'
  const urlWithTrailingSlash = 'http://test/'
  const urlWithNoTrailingSlash = 'http://test'
  t.plan(3)
  t.equal(utils.stripTrailingSlash(pathWithTralingSlash), '/test', `should remove trailing slash from path '${pathWithTralingSlash}'`)
  t.equal(utils.stripTrailingSlash(urlWithTrailingSlash), 'http://test', `should remove traling slash from url '${urlWithTrailingSlash}'`)
  t.equal(utils.stripTrailingSlash(urlWithNoTrailingSlash), 'http://test', `should leave url unchanged '${urlWithNoTrailingSlash}'`)
})

test('remove')

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
  const deepLinkDocParsedUrl = Url.parse('http://www.topshop.com/foo/bar')
  const deepLinkDirParsedUrl = Url.parse('http://www.topshop.com/foo/bar/')
  const deepLinkDocParsedUrl1 = Url.parse('https://www.polymer-project.org/1.0/start/first-element/intro')
  t.plan(6)
  t.equal(utils.normalizeLink(path, parsedUrl), `http://www.topshop.com${path}`, `should return 'http://www.topshop.com${path}' when provided with parsedUlr and '${path}'`)
  t.equal(utils.normalizeLink('/foo/bar?test=1', parsedUrl), 'http://www.topshop.com/foo/bar', `should remove query string from links`)
  t.equal(utils.normalizeLink(`http://www.topshop.com${path}`, parsedUrl), `http://www.topshop.com${path}`, `should not change valid URI with no query string`)
  t.equal(utils.normalizeLink(`bar.html`, deepLinkDocParsedUrl), `http://www.topshop.com/foo/bar.html`, `should not change valid URI with no query string`)
  t.equal(utils.normalizeLink(`bar.html`, deepLinkDirParsedUrl), `http://www.topshop.com/foo/bar/bar.html`, `should not change valid URI with no query string`)
  t.equal(utils.normalizeLink(`bar.html`, deepLinkDocParsedUrl1), `https://www.polymer-project.org/1.0/start/first-element/bar.html`, `should not change valid URI with no query string`)
})
