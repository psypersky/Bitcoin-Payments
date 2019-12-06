module.exports = (request, response) => {
  console.log('posting payment')

  // TODO:
  // get addresses + amounts from the request
  // check addresses are valid
  // calculate amount:
  // ammount calculation is sum of addresses amount + 2 % (sum of ADM) + transaction fees(n addresses + 1)
  // create and store payment

  return {
    payment_id: 'on3lnj34l2n42l3n4l2',
    ammount: 0.54,
    expires: '2019-10-11T02:34:27.769Z',
  }
}
