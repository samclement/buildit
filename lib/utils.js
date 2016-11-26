module.exports.isInternalLink = (href, hostname) => {
  const regex = new RegExp(`((http|https)?:?\/\/)?${hostname}`)
  return href.substring(0,4) === 'http' ? regex.test(href) : true
}
