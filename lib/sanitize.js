module.exports = name =>
  name
  .replace(/[^A-Za-z]/g, ' ')
  .replace(/  +/g, ' ')
  .trim()
