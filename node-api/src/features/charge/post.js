const ChargeModel = require('./model')
module.exports = async (request, response) => {
  // Charge: When a user request to make a payment a "Charge" is created,
  // for this a bitcoin Address is created and monitored, charges are temporal
  // and should only live for X ammount of minutes.
  // TODO:  get address from spv wallet
  // HOW TO GET AN ADDDRESS? GENERATE KEYS AND REQUEST NEWADDRESS?
  // HOW TO GENERATE KEYS?

  const address = Math.random().toString()

  const charge = new ChargeModel({ address })
  await charge.save()

  response.status(200).send(charge)
}
