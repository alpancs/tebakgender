var feature = require('./feature')
var frequency = require('../model/siswa-pulau-jawa.json')

module.exports = name => {
  var plus = (x, y) => x + y
  var multiply = (x, y) => x * y
  var prob_function = gender => subname => (frequency[gender][subname] || 0.1)/frequency.sum[gender]

  name = name.toUpperCase()
  var probabilities = {}

  probabilities.L = feature(name).map(prob_function('L'))
  probabilities.L.push(frequency.sum.L/frequency.sum.all)

  probabilities.P = feature(name).map(prob_function('P'))
  probabilities.P.push(frequency.sum.P/frequency.sum.all)

  var log_probability = {
    L: probabilities.L.map(Math.log).reduce(plus),
    P: probabilities.P.map(Math.log).reduce(plus)
  }

  var probability = {
    L: probabilities.L.reduce(multiply),
    P: probabilities.P.reduce(multiply)
  }

  var gender = log_probability.L > log_probability.P ? 'L' : 'P'

  return {gender, probability, log_probability}
}
