const mongoose = require('mongoose')
const Schema = mongoose.Schema
/**
   * Statuses:
     new: A transaction has been received and waiting for confirmation 
     pending: payment has been sent to SA address and waiting for confirmations.
     completed: Payment has been sent to Store Address and has X confirmations
   */
const statuses = {
  NEW: 'new',
  PENDING: 'pending',
  COMPLETED: 'completed',
}
const ttl = 1 * 60 * 60 * 1000 // 1 hour in ms

const schema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ['new', 'pending', 'completed'],
    },
    original_amount: { type: Number, required: true },
    final_amount: { type: Number, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
)

schema.pre('validate', async function(next) {
  if (this.isNew) {
    this.expires = new Date(new Date().getTime() + ttl)
    this.status = statuses.NEW
    this.final_amount = this.original_amount * 1.02 + fees // TODO: HOW TO CALCULATE FEES
  }
  next()
})

schema.statics.statuses = statuses

module.exports = mongoose.model('Payment', schema)
