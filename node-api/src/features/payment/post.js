const ChargeModel = require('../charge/model')
const PaymentModel = require('./model')

module.exports = async (request, response) => {
  // TODO:
  // get addresses + amounts from the request
  // check addresses are valid
  // calculate amount:
  // ammount calculation is sum of addresses amount + 2 % (sum of ADM) + transaction fees(n addresses + 1)
  // create and store payment

  const { addresses } = request.body
  
  await Promise.all(addresses.map(async ({address}) => {
    const charge = await ChargeModel.findOne({ address })
    if (!charge || charge.expires <= Date.now()) 
      return response.status(400).send({ msg: 'Invalid address' })
  }))
  
  const payment = await new PaymentModel({
    original_amount: addresses.reduce(
      (acc, address) => acc + address.amount,
      0
    ),
  })
  await payment.save()
  
  await Promise.all(addresses.map(async ({address}) => {
    const charge = await ChargeModel.findOne({ address })
    charge.payment_id = payment._id
    await charge.save()
  }))
  
  response.status(200).send({
    payment_id: payment._id,
    amount: payment.final_amount,
    expires: payment.expires,
  })
}
