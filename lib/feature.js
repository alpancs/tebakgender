module.exports = (name) => {
  let tokens = []
  name.split(' ').forEach((shortName) => {
    tokens.push(shortName)
    if (shortName.length > 4) tokens.push(shortName.slice(-4))
    if (shortName.length > 3) tokens.push(shortName.slice(-3))
  })
  return tokens
}
