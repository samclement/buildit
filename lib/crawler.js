const Url = require('url')
const async = require('async')
const request = require('request')
const cheerio = require('cheerio')
const utils = require('./utils')
const debug = require('debug')('crawler')

module.exports = function(url, callback) {

  if (!utils.isValidUrl(url)) {
    throw new Error('Not a valid url')
  }

  const parseLinks = function (body, parsedUrl) {
    const $ = cheerio.load(body)
    const getHrefs = (i, elem) => { return $(elem).attr('href') }
    const removeExternalLinks = (href) => { return utils.isInternalLink(href, parsedUrl.host) }
    const removeHashLinks = (href) => { return !utils.isHashLink(href) }
    const removeMailToLinks = (href) => { return !utils.isMailToLink(href) }
    const normalizeLink = (href) => { return utils.normalizeLink(Url.parse(href).pathname, parsedUrl) }
    return $('a')
      .map(getHrefs)
      .toArray()
      .filter(utils.removeEmptyStringLinks)
      .filter(removeMailToLinks)
      .filter(removeExternalLinks)
      .filter(removeHashLinks)
      .map(normalizeLink)
      .filter(utils.removeDuplicates)
  }

  const getUrl = function(url, cb) {
    const parsedUrl = Url.parse(url)
    const opts = {
      url: url, // start from the root url
      headers: {
        'User-Agent': 'buildit/crawler'
      }
    }
    debug(`fetch url: ${opts.url}`)
    request(opts, function(err, resp, body) {
      if (err) {
        cb(err, null)
      } else {
        history.push(url)
        const links = parseLinks(body, parsedUrl)
        queue = queue.concat(links).filter(utils.removeDuplicates)
        debug(links)
        cb(null, links)
      }
    })
  }

  const getUrls = (urls, callback) => {
    // console.log(urls)
    async.series(urls.map((url) => {
      return (cb) => {
        getUrl(url, processResults)
      }
    }), callback)
  }

  const processResults = (err, results) => {
    debug(`history: ${history.length} - ${queue.length}`)
    if (err) throw err
    const filtered = queue.filter(removeFetchedItems)
    if (filtered.length == 0) callback(null, history.sort())
    else getUrls(filtered, callback)
  }

  let history = []
  let queue = []
  const removeFetchedItems = (item) => { return history.indexOf(item) === -1 }

  getUrl(url, processResults)
}
