module.exports = name => {
  var tokens = []
  name.split(' ').forEach(short_name => {
    tokens.push(short_name)
    if (short_name.length > 4) tokens.push(short_name.slice(-4))
    if (short_name.length > 3) tokens.push(short_name.slice(-3))
  })
  return tokens
}
