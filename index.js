const Url = require('url')
const crawler = require('./lib/crawler')
const fs = require('fs')

crawler('https://buildit.digital', (err, results) => {
  if (err) {
    console.log(err)
  } else {
    const stream = fs.createWriteStream('./sitemap.xml')
    stream.write(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
    results.forEach((url) => { stream.write(`\n  <url><loc>${url}</loc></url>`) })
    stream.write(`\n</urlset>`)
    stream.end()
  }
})
