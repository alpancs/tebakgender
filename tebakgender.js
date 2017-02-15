var sanitize = require('./lib/sanitize.js')
var estimation = require('./lib/estimation.js')

module.exports = name => estimation(sanitize(name))
