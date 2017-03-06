'use strict'

const fs = require('fs')
const estimation = require('../lib/estimation')
const feature = require('../lib/feature')
const students = require('../corpus/data-siswa.json')

const K = 10

let plus = (x, y) => x + y

let buildModel = (trainingData) => {
  let frequency = {L: {}, P: {}, sum: {}}

  for (let student of trainingData) {
    for (let token of feature(student.name)) {
      let genderFrequency = frequency[student.gender]
      genderFrequency[token] = (genderFrequency[token] || 0) + 1
    }
  }

  frequency.sum.L = Object.values(frequency.L).reduce(plus)
  frequency.sum.P = Object.values(frequency.P).reduce(plus)
  frequency.sum.all = frequency.sum.L + frequency.sum.P

  return frequency
}

let test = (testingData, model) =>
  testingData.map(
    (student) => estimation(student.name, model).gender === student.gender
  )

let data = Array.from(students)

{
  console.log('--- removing outliers ----')
  let startTime = Date.now()
  while (true) {
    let model = buildModel(data)
    let correctness = test(data, model)
    let accuracy = correctness.reduce(plus) / correctness.length
    console.log(accuracy)
    if (accuracy === 1) break
    data = data.filter((_, i) => correctness[i])
  }
  let removedRatio = 1 - data.length / students.length
  console.log(`--- done removing ${removedRatio} outliers in ${(Date.now() - startTime) / 1000} s ---`)
}

{
  console.log('--- accuracy ---')
  let startTime = Date.now()
  let perFold = Math.ceil(data.length / K)
  let accuracySum = 0
  for (let i = 0; i < K; ++i) {
    let trainingData = Array.from(data)
    let testingData = trainingData.splice(i*perFold, perFold)
    let model = buildModel(trainingData)
    let correctness = test(testingData, model)
    let accuracy = correctness.reduce(plus) / correctness.length
    accuracySum += accuracy
    console.log(`${i+1}: ${accuracy}`)
  }
  let mean = accuracySum / K
  console.log(`mean: ${mean}`)
  console.log(`--- done in ${(Date.now() - startTime) / 1000} s ---`)
}

{
  console.log('--- saving clean data ---')
  let startTime = Date.now()
  fs.writeFile(
    'corpus/data-siswa-clean.json',
    JSON.stringify(data, null, 1),
    (err) => err ? console.log(err) : console.log(`--- clean data saved in ${(Date.now() - startTime) / 1000} s ---`)
  )
}

{
  console.log('--- saving model ---')
  let startTime = Date.now()
  let noOutliersModel = buildModel(data)
  fs.writeFile(
    'model/siswa-pulau-jawa.json',
    JSON.stringify(noOutliersModel, null, 1),
    (err) => err ? console.log(err) : console.log(`--- model saved in ${(Date.now() - startTime) / 1000} s ---`)
  )
}
