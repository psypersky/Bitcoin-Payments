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
  console.log('ChainTip', await makeRequest({ method: 'ChainTip' }))
  console.log('Balance', await makeRequest({ method: 'Balance' }))
  console.log(
    'MasterPrivateKey',
    await makeRequest({ method: 'MasterPrivateKey' })
  )
  console.log(
    'MasterPublicKey',
    await makeRequest({ method: 'MasterPublicKey' })
  )
  console.log(
    'HasKey',
    await makeRequest({
      method: 'HasKey',
      body: { addr: '14NQd6XHSNVGriKj7Ke1MuZgjk4Fkx329Q' },
    })
  )
  console.log('Params', await makeRequest({ method: 'Params' }))
  console.log('Transactions', await makeRequest({ method: 'Transactions' }))
  console.log('Peers', await makeRequest({ method: 'Peers' }))
  console.log(
    'GetKey',
    await makeRequest({
      method: 'GetKey',
      body: { addr: '14NQd6XHSNVGriKj7Ke1MuZgjk4Fkx329Q' },
    })
  )
  console.log('ListKeys', await makeRequest({ method: 'ListKeys' }))
  console.log('ListAddresses', await makeRequest({ method: 'ListAddresses' }))
}

module.exports = {
  testAPI,
}
