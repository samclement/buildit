const validUrl = require('valid-url')
const Url = require('url')

module.exports.isValidUrl = (url) => {
  return validUrl.isUri(url)
}

module.exports.isInternalLink = (href, hostname) => {
  const regex = new RegExp(`((http|https)?:?\/\/)?${hostname}`)
  return href.substring(0, 4) === 'http' || href.substring(0, 2) === '//' ? regex.test(href) : true
}

module.exports.removeDuplicates = (item, i, ar) => {
  return ar.indexOf(item) === i
}

module.exports.stripTrailingSlash = (href) => {
  const len = href.length
  const fixed = (href.charAt(len - 1) === '/') && len > 1 ? href.substring(0, len - 1) : href
  return fixed
}

module.exports.removeEmptyStringLinks = (href) => href.trim() === '' ? false : true

module.exports.isHashLink = (href) => {
  return href.substring(0, 1) === '#' ? true : false
}

module.exports.isMailToLink = (href) => {
  return href.toLowerCase().substring(0,6) === 'mailto' ? true : false
}

module.exports.startsWithSlash = (path) => {
  return path.substring(0, 1) === '/'
}

module.exports.getCurrentPath = (path) => {
  return path.split('/')
    .filter((item, i, arr) => { return i < arr.length - 1 ? true : false })
    .join('/')
}

module.exports.endsWithSlash = (path) => {
  return path.charAt(path.length - 1) === '/'
}

module.exports.normalizeLink = (href, parsedUrl) => {
  // href is either full URI or absolute path or relative path
  // this function will normalize to a full URI
  if (this.isValidUrl(href)) {
    return href.split('?')[0] // Quick hack
  } else {
    const path = Url.parse(href).pathname
    const isAbsolutePath = this.startsWithSlash(href) ? true : false
    if (isAbsolutePath) {
      return Url.resolve(`${parsedUrl.protocol}//${parsedUrl.host}`, `${path}`)
    } else {
      const basePath = parsedUrl.pathname.split('?')[0]
      return Url.resolve(`${parsedUrl.protocol}//${parsedUrl.host}${basePath}`, `${path}`)
    }
  }
}
