const validUrl = require('valid-url')
const Url = require('url')

module.exports.isValidUrl = (url) => {
  return validUrl.isUri(url)
}

module.exports.isInternalLink = (href, hostname) => {
  const regex = new RegExp(`((http|https)?:?\/\/)?${hostname}`)
  return href.substring(0,4) === 'http' ? regex.test(href) : true
}

module.exports.isHashLink = (href) => {
  return href.substring(0,1) === '#' ? true : false
}

module.exports.startsWithSlash = (path) => {
  return path.substring(0,1) === '/'
}

module.exports.normalizeLink = (href, parsedUrl) => {
  // href is either full URI or path
  if (this.isValidUrl(href)) return href.split('?')[0] // Quick hack
  else return `${parsedUrl.protocol}//${parsedUrl.host}${this.startsWithSlash(href) ? '' : '/'}${Url.parse(href).pathname}`
}
