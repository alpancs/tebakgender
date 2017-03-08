module.exports = (name) =>
  name.replace(/'/g, '')
  .replace(/[^A-Za-z]/g, ' ')
  .replace(/ +/g, ' ')
  .trim()
