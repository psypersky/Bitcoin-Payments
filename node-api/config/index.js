const config = {
  bnIp: process.env.BITCOIN_NODE_IP,
  bnSshProxyUsername: process.env.BITCOIN_NODE_SSH_PROXY_USERNAME,
  bnSshProxyPemFilePath: __dirname + process.env.BITCOIN_NODE_SSH_PROXY_PEM_FILE_PATH,
  bnAuth: process.env.BITCOIN_NODE_AUTH,
}

module.exports = config
