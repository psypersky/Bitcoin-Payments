module.exports = (request, response) => {
  // Charge: When a user request to make a payment a "Charge" is created,
  // for this a bitcoin Address is created and monitored, charges are temporal
  // and should only live for X ammount of minutes.
  // TODO:  where should we store addresses?
  console.log('posting charge')

  // TODO:  get address from spv wallet
  // TODO:  store address + ttl
  
  return {
    address: '12AaMuRnzw6vW6s2KPRAGeX53meTf8JbZS',
    expires: '2019-10-11T02:34:27.769Z',
  }
}
