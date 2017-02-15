var tebakgender = require('../');

var assert = require('assert');

var names = [
  ['Alfan Nur Fauzan', 'L'],
  ['Ayu Deswanti Rio Dingin', 'P'],
  ['Susilo Bambang Yudhoyono', 'L'],
  ['Risma', 'P'],
]

names.forEach(([name, gender]) => {
  var predicted = tebakgender(name).gender;
  console.log(`${name} is predicted as ${predicted}`);
  assert.strictEqual(predicted, gender);
})

