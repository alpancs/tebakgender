'use strict'

const fs = require('fs')
const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
  'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOPEMBER', 'DESEMBER']

const readFilePromise = (fileName) =>
  new Promise((resolve, reject) =>
    fs.readFile(fileName, 'utf8', (err, data) =>
      err ? reject(err) : resolve(data)
    )
  )

readFilePromise('corpus/Daftar Kota dan Kabupaten di Pulau Jawa.txt')
.then((citiesRaw) => {
  let cities = citiesRaw.split('\n').map((city) =>
    city.replace(/^(Kabupaten|Kota)( Administrasi)? /, '').toUpperCase()
  )
  let setOfCities = new Set(cities)
  setOfCities.add('JAKARTA')
  setOfCities.delete('')
  return setOfCities
})
.then((setOfCities) =>
  readFilePromise('corpus/data-siswa.csv')
  .then((studentsRaw) =>
    studentsRaw.trim().split('\n')
    .map((student) => {
      let [nisn, name, gender, placeOfBirth, dateOfBirth] = student.split(',')
      name = name.trim()
      return {nisn, name, gender, placeOfBirth, dateOfBirth}
    })
    .filter((student) =>
      setOfCities.has(student.placeOfBirth)
      && !student.name.match(/(\b\w\b )(\b\w\b )(\b\w\b )+/)
    ).map((student) => {
      let [date, month, year] = student.dateOfBirth.split(' ')
      date = parseInt(date)
      month = months.indexOf(month)
      year = parseInt(year)
      student.dateOfBirth = new Date(year, month, date)
      return student
    })
  )
)
.then((students) =>
  fs.writeFile('corpus/data-siswa.json', JSON.stringify(students, null, 2),
    (err) => err ? console.log(err) : null
  )
).catch(console.log)
