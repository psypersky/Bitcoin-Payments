const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const apiUrl = 'localhost:8234'

const packageDefinition = protoLoader.loadSync(`${__dirname}/api.proto`)
const proto = grpc.loadPackageDefinition(packageDefinition)
const client = new proto.pb.API(apiUrl, grpc.credentials.createInsecure())

const methods = {
  NEW_ADDRESS: 'NewAddress',
  SPEND: 'Spend',
  GET_TX: 'GetTransaction',
  GET_CONFIRMATIONS: 'GetConfirmations',
}

/**
 * Internal gRCP client requester
 * @param {*} method and body of the request
 */
const request = ({ method, body = {} }) =>
  new Promise((resolve, reject) =>
    client[method](body, (error, response) =>
      !error ? resolve(response) : reject(error)
    )
  )

module.exports = {
  request,
  methods,
}
