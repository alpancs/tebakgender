# TebakGender
Predicting gender (L: male, P: female) based on name.
It works very well for common Javanese names.

## API
`estimation = tebakgender(name[, sanitized])`
- Parameter
  - *string* `name`: name to be predicted
  - *boolean* `sanitized`: is the name has been sanitized?
- Return Object
  - `gender`
  - `confidence`
  - `logProb`
    - `L`
    - `P`

## Example
Script:
```javascript
const tebakgender = require('tebakgender')
let estimation = tebakgender('Alfan Nur Fauzan')
console.log(estimation)
```
Output:
```javascript
{
  gender: 'L',
  confidence: 0.9999999999994883,
  logProb: {
    L: -52.325253924628846,
    P: -80.62619514175651
  }
}
```

# Related Project
Bejometer https://github.com/alpancs/bejometer
