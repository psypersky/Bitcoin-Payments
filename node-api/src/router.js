const express = require('express')
const router = express.Router()

const { chargeFeature } = require('./features')

// TODO: security? auth?

router.route('/charge').post(chargeFeature.post)
// router.route('/charge/:address').get(chargeFeature.get)

// router.route('/payment').post(paymentFeature.post)
// router.route('/payment/:paymentId').post(paymentFeature.postId)

module.exports = router
