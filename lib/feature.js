module.exports = name => {
  var set_of_token = new Set()
  name.split(' ').forEach(short_name => {
    set_of_token.add(short_name.slice(-3))
    set_of_token.add(short_name.slice(-4))
    set_of_token.add(short_name)
  })
  return Array.from(set_of_token)
}
