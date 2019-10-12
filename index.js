const express = require('express')
const app = express()
const PORT = 3002

// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: './dev.sqlite'
//   }
// })

app.get('/', (req, res) => res.send('Welcome to Fasting Club! We will be with you shortly.'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
