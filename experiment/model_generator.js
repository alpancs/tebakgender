'use strict'

var fs = require('fs')
var feature = require('../lib/feature')
var students = require('../corpus/data_siswa.json')

var frequency = {L: {}, P: {}, sum: {}}

students.forEach(student => {
  feature(student.name).forEach(token => {
    frequency[student.gender][token] = (frequency[student.gender][token] || 0) + 1
  })
})

var plus = (x, y) => x + y
frequency.sum.L = Object.values(frequency.L).reduce(plus)
frequency.sum.P = Object.values(frequency.P).reduce(plus)
frequency.sum.all = frequency.sum.L + frequency.sum.P

fs.writeFile('model/siswa-pulau-jawa.json', JSON.stringify(frequency, null, 1), err => err ? console.log(err) : null)
