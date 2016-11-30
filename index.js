const Url = require('url')
const crawler = require('./lib/crawler')

crawler('https://buildit.digital', (err, results) => {
  const graph = results.reduce((pre, cur) => {
    const path = Url.parse(cur).pathname
      .split('/')
      .filter((item) => { return item == '' ? false : true })
    console.log(path)
  }, {})
})
