const url = require('url')
const validUrl = require('valid-url')
const cheerio = require('cheerio')

module.exports = (url) => {
  if (!validUrl.isUri(url)) {
    throw new Error('Not a valid url')
  }
}
