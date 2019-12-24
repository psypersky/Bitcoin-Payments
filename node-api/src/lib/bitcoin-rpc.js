const http = require('http')
const HTTPAgent = require('ssh2').HTTPAgent
const {
  bnIp,
  bnSshProxyUsername,
  bnSshProxyPemFilePath,
  bnAuth,
} = require('../../config')
function callRPC(opts) {
  return new Promise(function(resolve, reject) {
    const sshConfig = {
      host: bnIp,
      port: 22,
      username: bnSshProxyUsername,
      // TODO: Send this dir to an .env
      privateKey: require('fs').readFileSync(bnSshProxyPemFilePath)
    }

    // TODO: Make ssh optional
    const agent = new HTTPAgent(sshConfig)
    let data = {'jsonrpc':'1.0','id':'bPayments'}
    data = Object.assign(data, opts)
    const postData = JSON.stringify(data)
    const req = http.request({
      method: 'POST',
      host: '127.0.0.1',
      port: '8332',
      path: '/',
      auth: bnAuth,
      agent,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      // res.resume(); // What?
      let responseData = ''
      res.on('data', (chunk) => {
        responseData += chunk
      });
      res.on('end', () => {
        let responseJSON
        try {
          responseJSON = JSON.parse(responseData)
        } catch(error) {
          reject(error)
          return
        }
        resolve(responseJSON)
      });
    });

    req.on('error', (error) => {
      console.error(`problem with request: ${e.message}`)
      reject(error)
    });

    // Write data to request body
    req.write(postData)
    req.end()
  })
}

async function getNewAddress() {
  const res = await callRPC({'method':'getnewaddress','params':[]})
  return res
}

module.exports = {
  getNewAddress,
}
