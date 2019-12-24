const asyncHandler = require('express-async-handler')
const ChargeModel = require('./model')
const { getNewAddress } = require('../../lib/bitcoin-rpc')

async function chargePost (request, response) {
  const addr = await getNewAddress()

  const charge = await ChargeModel.create({ address: addr })

  response.status(200).send(charge)
}

module.exports = asyncHandler(chargePost)