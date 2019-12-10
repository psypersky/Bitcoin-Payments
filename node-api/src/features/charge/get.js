const ChargeModel = require('./model')
const PaymentModel = require('../payment/model')

module.exports = async (request, response) => {
  const { address } = request.params
  const charge = await ChargeModel.findOne({ address })
  
  if (!charge) {
    response.status(400).send({
      msg: 'Invalid address'
    })
  }

  let toReturn = {
    address: charge.address,
    expires: charge.expires,
  }

  if (charge.payment_id) {
    const payment = await PaymentModel.findById(charge.payment_id)
    toReturn = {
      ...toReturn,
      payment_status: payment.status,
      original_amount: payment.original_amount,
      final_amount: payment.final_amount,
    }
  }

  response.status(200).send(toReturn)
}
