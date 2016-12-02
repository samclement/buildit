const Url = require('url')
const crawler = require('./lib/crawler')
const fs = require('fs')

crawler('https://buildit.digital', (err, results) => {
  if (err) {
    console.log(err)
  } else {
    console.log(results)
  }
})
