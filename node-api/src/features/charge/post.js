const ChargeModel = require('./model')
const spvwallet = require('../../lib/spvwallet')

module.exports = async (request, response) => {
  const { addr } = await spvwallet.request({
    method: spvwallet.methods.NEW_ADDRESS,
  })

  const charge = await ChargeModel.create({ address: addr })

  response.status(200).send(charge)
}
