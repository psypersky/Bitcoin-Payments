require('dotenv').config({ path: __dirname + '/../env/.env.dev' })
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const dbClient = require('./lib/database')

const port = 7001

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

async function startServer() {
  await dbClient.connect()
  await new Promise((resolve, reject) => {
    app.listen(port, '0.0.0.0', err => {
      if (err) {
        reject(err)
        return
      }
      console.log(
        '\n🔥==> BITCOIN PAYMENTS <==🔥 \n',
        `Listening on port ${port}\n`
      )
      resolve()
    })
  })
  process.emit('listening')
}

startServer().catch(err => {
  console.error('[app] listening', err.message, err.stack)
  // TODO: Exit with error
})