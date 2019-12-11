const dbClient = require('../../lib/database')
const ttl = 1 * 60 * 1000 // 1 hour in ms
const statuses = {
  NEW: 'NEW', // charge was just created
  USER_DEPOSIT_PENDING: 'USER_DEPOSIT_PENDING', // we detected the user has deposit but it is not confirmed
  INTERNAL_PAYMENT_PENDING: 'INTERNAL_PAYMENT_PENDING', // we have made the payments to us and store
  DONE: 'DONE', // payments to us and store are confirmed
}

// CHARGE
// {
//   address: String,
//   expires: Date,
//   status: Statuses,
//   original_amount: Number,
//   final_amount: Number
// }

const create = async ({
  address,
  expires = new Date(new Date().getTime() + ttl),
  status = statuses.NEW,
}) => {
  const insert = 'INSERT INTO charge (address, expires, status) VALUES (?,?,?)'
  await dbClient.db.run(insert, [address, expires, status])
  return {
    address,
    expires,
    status,
  }
}

const getByAddress = async ({ address }) =>
  await dbClient.db.get(`SELECT * FROM charge WHERE address = ?`, address)

const updateStatus = async ({ id, newStatus }) =>
  await dbClient.db.run(`UPDATE charge SET status = ?, WHERE id = ?`, [
    newStatus,
    id,
  ])

module.exports = {
  create,
  getByAddress,
  updateStatus,
  statuses,
}
