module.exports = (name) =>
  name.replace(/'/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, ' ')
    .replace(/ +/g, ' ')
    .trim()
