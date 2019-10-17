const express = require('express')
const app = express()
const PORT = 3002
// const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile.js')
const database = require('knex')(configuration.development)

app.get('/', function (req, res) {
  database.raw(
    `INSERT INTO zipcodes (number, deg_latitude, deg_longitude)
    VALUES ('77063', '75', '75');`
  ).catch(function (error) {
    console.log(error)
  })

  res.send('Welcome to Fasting Club! We will be with you shortly.')
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
