const feature = require('./feature')
const frequency = require('../model/siswa-pulau-jawa.json')

module.exports = name => {
  let plus = (x, y) => x + y
  let multiply = (x, y) => x * y
  let probFunction = gender => subname => (frequency[gender][subname] || 0.1) / frequency.sum[gender]

  name = name.toUpperCase()

  let LProbabilities = feature(name).map(probFunction('L'))
  LProbabilities.push(frequency.sum.L / frequency.sum.all)

  let PProbabilities = feature(name).map(probFunction('P'))
  PProbabilities.push(frequency.sum.P / frequency.sum.all)

  let logProbability = {
    L: LProbabilities.map(Math.log).reduce(plus),
    P: PProbabilities.map(Math.log).reduce(plus)
  }

  let probability = {
    L: LProbabilities.reduce(multiply),
    P: PProbabilities.reduce(multiply)
  }

  let gender = logProbability.L > logProbability.P ? 'L' : 'P'

  let minProb = probability.L < probability.P ? probability.L : probability.P
  let maxProb = probability.L > probability.P ? probability.L : probability.P
  let confidence = 1 - minProb / maxProb

  return {gender, confidence, probability, logProbability}
}
