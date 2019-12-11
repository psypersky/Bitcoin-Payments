const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const apiUrl = 'localhost:8234'

const packageDefinition = protoLoader.loadSync(`${__dirname}/api.proto`)
const proto = grpc.loadPackageDefinition(packageDefinition)
const client = new proto.pb.API(apiUrl, grpc.credentials.createInsecure())

/**
 * Internal gRCP client requester
 * @param {*} method and body of the request
 */
const makeRequest = ({ method, body = {} }) =>
  new Promise((resolve, reject) =>
    client[method](body, (error, response) =>
      !error ? resolve(response) : reject(error)
    )
  )

const testAPI = async () => {
  // console.log(
  //   'get new address',
  //   await makeRequest({
  //     method: 'NewAddress',
  //     body: { key: '' },
  //   })
  // )
  console.log(
    'get new address',
    await makeRequest({
      method: 'GetKey',
      body: { addr: '17KSurhxTWLsVBeL28GNP31hRFMJ4vNAix' },
    })
  )
}

const getNewAddress = async () =>
  await makeRequest({ method: 'NewAddress' })

module.exports = {
  testAPI,
  getNewAddress,
}
