const feature = require('./feature')
const modelSiswaPulauJawa = require('../model/siswa-pulau-jawa')

module.exports = (name, customModel) => {
  let model = customModel || modelSiswaPulauJawa
  let plus = (x, y) => x + y
  let probFunc = (gender) =>
    (subname) => (model[gender][subname] || 0.1) / model.sum[gender]

  let LProbabilities = feature(name).map(probFunc('L'))
  LProbabilities.push(model.sum.L / model.sum.all)

  let PProbabilities = feature(name).map(probFunc('P'))
  PProbabilities.push(model.sum.P / model.sum.all)

  let logProb = {
    L: LProbabilities.map(Math.log).reduce(plus),
    P: PProbabilities.map(Math.log).reduce(plus),
  }

  let gender = logProb.L > logProb.P ? 'L' : 'P'

  let minProb = Math.pow(Math.E, Math.min(logProb.L, logProb.P))
  let maxProb = Math.pow(Math.E, Math.max(logProb.L, logProb.P))
  let confidence = 1 - minProb / maxProb

  return {gender, confidence, logProb}
}
