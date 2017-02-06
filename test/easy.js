var tebakgender = require('../');

var assert = require('assert');

var names = [
  ['Alfan Nur Fauzan', 'M'],
  ['Alfan Nur Fauzan', 'M'],
  ['Alfan Nur Fauzan', 'M'],
]

names.forEach(([name, gender]) => {
  var predicted = tebakgender(name);
  console.log(`${name} should be predicted as ${gender}`);
  assert.strictEqual(predicted, gender);
})

