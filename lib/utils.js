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

module.exports.normalizeLink = (path, parsedUrl) => {
  return `${parsedUrl.protocol}//${parsedUrl.host}${this.startsWithSlash(path) ? '' : '/'}${path}`
}
