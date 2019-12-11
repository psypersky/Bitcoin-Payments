const express = require('express')
const router = express.Router()

const { testAPI } = require('./lib/spvwallet')
const { chargeFeature } = require('./features')

// Just for testing the spvwallet
router.get('/', async () => {
  await testAPI()
})

// TODO: security? auth?

router.route('/charge').post(chargeFeature.post)
router.route('/charge/:address').get(chargeFeature.get)

// router.route('/payment').post(paymentFeature.post)
// router.route('/payment/:paymentId').post(paymentFeature.postId)

module.exports = router
