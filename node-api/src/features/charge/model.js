const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ttl = 12 * 60 * 60 * 1000 // 12 hours in ms

const schema = new Schema(
  {
    address: { type: String, required: true },
    expires: { type: Date, required: true },
    payment_id: { type: Schema.Types.ObjectId, required: false },
  },
  { timestamps: true }
)

schema.pre('validate', async function(next) {
  if (this.isNew) {
    this.expires = new Date(new Date().getTime() + ttl)
  }
  next()
})

module.exports = mongoose.model('Charge', schema)
