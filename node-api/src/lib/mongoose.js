const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost:27017/bitcoin_payments'

module.exports = mongoose.connect(mongoUrl)
