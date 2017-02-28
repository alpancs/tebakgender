# Tebakgender
*Memprediksi gender berdasarkan nama.*

# Example
Script:
```
var tebakgender = require('tebakgender')
var estimation = tebakgender('Alfan Nur Fauzan')
console.log(estimation)
```
Output:
```
{
  gender: 'L',
  confidence: 0.9999999969883645,
  probability: {
    L: 1.6194805723879266e-23,
    P: 4.877285136684573e-32
  },
  logProbability: {
    L: -52.47735167536137,
    P: -72.09813423520016
  }
}
```
