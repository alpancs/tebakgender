module.exports = name =>
  name
  .replace(/[^A-Za-z]/g, ' ')
  .replace(/ {2,}/g, ' ')
  .trim()
