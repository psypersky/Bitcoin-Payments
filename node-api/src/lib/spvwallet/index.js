const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const apiUrl = 'localhost:8234'

const packageDefinition = protoLoader.loadSync(`${__dirname}/api.proto`)
const proto = grpc.loadPackageDefinition(packageDefinition)
const client = new proto.pb.API(apiUrl, grpc.credentials.createInsecure())

const getBalance = () => 
  client.Balance({}, (error, response) => {
    if (!error) {
      console.log('Response : ', response)
    } else {
      console.log('Error:', error.message)
    }
  })

module.exports = {
  getBalance
}