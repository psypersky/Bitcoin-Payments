const ChargeModel = require('./model')

module.exports = async (request, response) => {
  const { address } = request.params
  const charge = await ChargeModel.getByAddress({ address })

  if (!charge) {
    response.status(400).send({
      msg: 'Invalid address',
    })
  }

  // NEW charge
  // the charge was just created
  // Look for transaction in spv and check if any
  // if the transacion is not confirmed status = USER_DEPOSIT_PENDING
  // if the transaction is confirmed make payments and status = INTERNAL_PAYMENT_PENDING
  // return charge

  // USER_DEPOSIT_PENDING charge
  // the user has deposit money
  // Look for the transaction
  // if the transaction is confirmed make payments and status = INTERNAL_PAYMENT_PENDING
  // return charge

  // INTERNAL_PAYMENT_PENDING charge
  // check both payments
  // if both payments are confirmed status = DONE
  // return charge

  // DONE charge
  // return charge

  if (
    charge.status === ChargeModel.statuses.NEW ||
    charge.status === ChargeModel.statuses.USER_DEPOSIT_PENDING
  ) {
    // TODO: get address status from spvwallet
    const addressStatusFromSPV = null
    switch (addressStatusFromSPV) {
      case 'pending':
        charge.status === ChargeModel.statuses.NEW &&
          (await ChargeModel.updateStatus({
            id: charge.id,
            newStatus: ChargeModel.statuses.USER_DEPOSIT_PENDING,
          }))
        break
      case 'confirmed':
        // TODO: pay 2% to our address -> constant
        // TODO: pay 98% to store address -> constant
        // TODO: store txIds in charge
        await ChargeModel.updateStatus({
          id: charge.id,
          newStatus: ChargeModel.statuses.INTERNAL_PAYMENT_PENDING,
        })
        break
    }
  } else if (charge.status === ChargeModel.statuses.INTERNAL_PAYMENT_PENDING) {
    // TODO: get confirmation from spvwallet on 2% and 98% payments
    const bothPaymentsCompleted = null
    if (bothPaymentsCompleted) {
      await ChargeModel.updateStatus({
        id: charge.id,
        newStatus: ChargeModel.statuses.DONE,
      })
    }
  }

  response.status(200).send(charge)
}
