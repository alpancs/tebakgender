var sanitize = require('./lib/sanitize')
var estimation = require('./lib/estimation')

module.exports = name => estimation(sanitize(name))
