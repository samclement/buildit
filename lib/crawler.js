const Url = require('url')
const request = require('request')
const cheerio = require('cheerio')
const utils = require('./utils')

module.exports = function(url, callback) {

  if (!utils.isValidUrl(url)) {
    throw new Error('Not a valid url')
  }

  const parseLinks = function (body, parsedUrl) {
    const $ = cheerio.load(body)
    const getHrefs = (i, elem) => { return $(elem).attr('href') }
    const removeExternalLinks = (href) => { return utils.isInternalLink(href, parsedUrl.host) }
    const removeHashLinks = (href) => { return !utils.isHashLink(href) }
    const normalizeLink = (href) => { return utils.normalizeLink(Url.parse(href).pathname, parsedUrl) }
    return $('a')
      .map(getHrefs)
      .toArray()
      .filter(removeExternalLinks)
      .filter(removeHashLinks)
      .map(normalizeLink)
  }

  const getUrl = function(url, cb) {
    const parsedUrl = Url.parse(url)
    const opts = {
      url: `${parsedUrl.protocol}//${parsedUrl.host}`, // start from the root url
      headers: {
        'User-Agent': 'buildit/crawler'
      }
    }
    request(opts, function(err, resp, body) {
      if (err) {
        throw err
      } else {
        cb(null, parseLinks(body, parsedUrl))
      }
    })
  }

  getUrl(url, callback)
}
