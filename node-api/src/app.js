const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
require('./lib/mongoose')
const port = 7001

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(port, () =>
  console.log(`Bitcoin-Payments listening on port ${port}`)
)