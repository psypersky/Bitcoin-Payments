module.exports = (request, response) => {
  console.log('getting charge')
  // TODO: 
  // get the address from params
  // look for the address in the store and get expiration
  // get related payment if any
  // if payment => return original_ammount and final_ammount

  /**
   * Payment statuses:
     new: Charge has been created
     pending: A transaction has been received and waiting for confirmation or 
     payment has been sent to SA address and waiting for confirmations.
     completed: Payment has been sent to Store Address and has X confirmations
   */

  return {
    address: '12AaMuRnzw6vW6s2KPRAGeX53meTf8JbZS',
    expires: '2019-10-11T02:34:27.769Z',
    payment_status: 'completed',
    original_ammount: 0.3,
    final_ammount: 0.2892636,
  }
}
