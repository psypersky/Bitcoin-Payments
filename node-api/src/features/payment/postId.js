const PaymentModel = require('./model')

module.exports = async (request, response) => {
  // TODO:
  // send all the transactions and the 2% to the designated comissions address
  const { paymentId } = request.params

  const payment = await PaymentModel.findById(paymentId)
  if (
    !payment ||
    payment.expires <= new Date() ||
    payment.status !== PaymentModel.statuses.NEW
  )
    return response.status(400).send({ msg: 'Invalid payment' })

  // TODO: send transactions

  payment.status = PaymentModel.statuses.PENDING
  await payment.save()

  response.status(200).send(payment)
}
