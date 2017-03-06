const tebakgender = require('..')

const assert = require('assert')

let names = [
  ['Alfan Nur Fauzan', 'L'],
  ['Ayu Deswanti Rio Dingin', 'P'],
  ['Susilo Bambang Yudhoyono', 'L'],
  ['Risma', 'P'],
  ['Karjiman', 'L'],
]

names.forEach(([name, gender]) => {
  let predicted = tebakgender(name).gender
  console.log(`${name} is predicted as ${predicted}`)
  assert.strictEqual(predicted, gender)
})
