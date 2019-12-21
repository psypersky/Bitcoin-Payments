const ChargeModel = require('./model')
const spvwallet = require('../../lib/spvwallet')

// TODO: get these values from .env or similar
const storeAddress = ''
const internalAddress = ''

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

module.exports = async (request, response) => {
  const { address } = request.params
  const charge = await ChargeModel.getByAddress({ address })

  if (!charge) {
    response.status(400).send({
      msg: 'Invalid address',
    })
  }

  if (
    charge.status === ChargeModel.statuses.NEW ||
    charge.status === ChargeModel.statuses.USER_DEPOSIT_PENDING
  ) {
    // TODO: get transaction from address HOW?? should the store send us the txid?
    const tx = await spvwallet.request({
      method: spvwallet.methods.GET_TX,
      body: {
        hash: 'TX ID', // should the store send us this?
      },
    })
    const confirmations = await spvwallet.request({
      method: spvwallet.methods.GET_CONFIRMATIONS,
      body: {
        hash: 'TX ID', // should the store send us this?
      },
    })
    // if not confirmed and status is new
    if (confirmations < 6 && charge.status === ChargeModel.statuses.NEW) {
      charge.status === ChargeModel.statuses.NEW &&
        (await ChargeModel.updateStatus({
          id: charge.id,
          newStatus: ChargeModel.statuses.USER_DEPOSIT_PENDING,
        }))
      // if confirmed
    } else if (confirmations >= 6) {
      // make internal payments
      const feeTxId = await spvwallet.request({
        method: spvwallet.methods.SPEND,
        body: {
          address: internalAddress,
          amount: tx.value * 0.02,
          feeLevel: 1,
        },
      })
      const storeTxId = await spvwallet.request({
        method: spvwallet.methods.SPEND,
        body: {
          address: storeAddress,
          amount: tx.value * 0.98,
          feeLevel: 1,
        },
      })
      // add internal txids to charge and update charge
      await ChargeModel.addTxs({
        id: charge.id,
        storeTxId,
        feeTxId,
      })
      await ChargeModel.updateStatus({
        id: charge.id,
        newStatus: ChargeModel.statuses.INTERNAL_PAYMENT_PENDING,
      })
    }
  } else if (charge.status === ChargeModel.statuses.INTERNAL_PAYMENT_PENDING) {
    // get confirmation from spvwallet on 2% and 98% payments
    const storeTxConfirmations = await spvwallet.request({
      method: spvwallet.methods.GET_CONFIRMATIONS,
      body: {
        hash: charge.storeTxId,
      },
    })
    const feeTxConfirmations = await spvwallet.request({
      method: spvwallet.methods.GET_CONFIRMATIONS,
      body: {
        hash: charge.feeTxId,
      },
    })
    // if both confirmed set charge as done
    if (storeTxConfirmations >= 6 && feeTxConfirmations >= 6) {
      await ChargeModel.updateStatus({
        id: charge.id,
        newStatus: ChargeModel.statuses.DONE,
      })
    }
  }

  response.status(200).send(charge)
}
