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
    const links = $('a')
      .map(getHrefs)
      .toArray()
      .filter(utils.removeEmptyStringLinks)
      .filter(removeMailToLinks)
      .filter(removeExternalLinks)
      .filter(removeHashLinks)
      .map(normalizeLink)
      .filter(utils.removeDuplicates)
    return links
  }

  const getUrl = function(url, cb) {
    const parsedUrl = Url.parse(url)
    const opts = {
      url,
      headers: {
        'User-Agent': 'buildit/crawler'
      }
    }
    request(opts, function(err, resp, body) {
      if (err) {
        cb(err, null)
      } else {
        debug(`${resp.statusCode} - ${opts.url}`)
        history.push(url)
        // TODO: add status code to history and fitler out 404s, remove processedUrls
        if (resp.statusCode === 200) processedUrls.push(url)
        const links = parseLinks(body, parsedUrl)
        queue = queue.concat(links).filter(utils.removeDuplicates)
        // debug(links)
        cb(null, links)
      }
    })
  }

  const getUrls = (urls, callback) => {
    async.series(urls.map((url) => {
      return (cb) => {
        getUrl(url, processResults)
      }
    }), callback)
  }

  const processResults = (err, results) => {
    if (err) throw err
    const filtered = queue.filter(removeFetchedItems)
    if (filtered.length == 0) callback(null, processedUrls.sort())
    else getUrls(filtered, callback)
  }

  let history = []
  let queue = []
  let processedUrls = []
  const removeFetchedItems = (item) => { return history.indexOf(item) === -1 }

  const parsedInitialUrl = Url.parse(url)
  const normalizedUrl = Url.resolve(`${parsedInitialUrl.protocol}//${parsedInitialUrl.host}`, parsedInitialUrl.pathname)
  getUrl(normalizedUrl, processResults)
}
