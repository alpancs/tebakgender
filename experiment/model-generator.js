'use strict'

const fs = require('fs')
const feature = require('../lib/feature')
let students = require('../corpus/data-siswa')

let frequency = {L: {}, P: {}, sum: {}}

students.forEach((student) => {
  feature(student.name).forEach((token) => {
    let genderFrequency = frequency[student.gender]
    genderFrequency[token] = (genderFrequency[token] || 0) + 1
  })
})

let plus = (x, y) => x + y
frequency.sum.L = Object.values(frequency.L).reduce(plus)
frequency.sum.P = Object.values(frequency.P).reduce(plus)
frequency.sum.all = frequency.sum.L + frequency.sum.P

fs.writeFile('model/siswa-pulau-jawa.json', JSON.stringify(frequency, null, 1),
  (err) => err ? console.log(err) : null
)
