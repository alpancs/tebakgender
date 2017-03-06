const feature = require('./feature')
const modelSiswaPulauJawa = require('../model/siswa-pulau-jawa.json')

module.exports = (name, customModel) => {
  let model = customModel || modelSiswaPulauJawa
  let plus = (x, y) => x + y
  let multiply = (x, y) => x * y
  let probFunction = (gender) =>
    (subname) => (model[gender][subname] || 0.1) / model.sum[gender]

  name = name.toUpperCase()

  let LProbabilities = feature(name).map(probFunction('L'))
  LProbabilities.push(model.sum.L / model.sum.all)

  let PProbabilities = feature(name).map(probFunction('P'))
  PProbabilities.push(model.sum.P / model.sum.all)

  let logProbability = {
    L: LProbabilities.map(Math.log).reduce(plus),
    P: PProbabilities.map(Math.log).reduce(plus),
  }

  let probability = {
    L: LProbabilities.reduce(multiply),
    P: PProbabilities.reduce(multiply),
  }

  let gender = logProbability.L > logProbability.P ? 'L' : 'P'

  let minProb = probability.L < probability.P ? probability.L : probability.P
  let maxProb = probability.L > probability.P ? probability.L : probability.P
  let confidence = 1 - minProb / maxProb

  return {gender, confidence, probability, logProbability}
}
