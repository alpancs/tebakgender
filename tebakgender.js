const sanitize = require('./lib/sanitize')
const estimation = require('./lib/estimation')

module.exports = (name, sanitized) =>
  sanitized
  ? estimation(name)
  : estimation(sanitize(name))
