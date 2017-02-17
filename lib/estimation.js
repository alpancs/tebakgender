var feature = require('./feature')
var frequency = require('../model/siswa-pulau-jawa.json')

module.exports = name => {
  var plus = (x, y) => x + y
  var multiply = (x, y) => x * y
  var prob_function = gender => subname => (frequency[gender][subname] || 0.1)/frequency.sum[gender]

  name = name.toUpperCase()

  L_probabilities = feature(name).map(prob_function('L'))
  L_probabilities.push(frequency.sum.L/frequency.sum.all)

  P_probabilities = feature(name).map(prob_function('P'))
  P_probabilities.push(frequency.sum.P/frequency.sum.all)

  var log_probability = {
    L: L_probabilities.map(Math.log).reduce(plus),
    P: P_probabilities.map(Math.log).reduce(plus)
  }

  var probability = {
    L: L_probabilities.reduce(multiply),
    P: P_probabilities.reduce(multiply)
  }

  var gender = log_probability.L > log_probability.P ? 'L' : 'P'

  var min_prob = probability.L < probability.P ? probability.L : probability.P
  var max_prob = probability.L > probability.P ? probability.L : probability.P
  var confidence = 1 - min_prob/max_prob

  return {gender, confidence, probability, log_probability}
}
