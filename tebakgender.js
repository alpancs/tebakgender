const sanitize = require('./lib/sanitize')
const estimation = require('./lib/estimation')

module.exports = name => estimation(sanitize(name))
