const express = require('express')
const router = express.Router()
const { getBalance } = require('./lib/spvwallet')

router.get('/', (req, res) => {})

module.exports = router