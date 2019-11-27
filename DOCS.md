# Documentation, Instructions and References

## Bitcoin

Bitcoin [https://github.com/bitcoin/bips](Bips)
Bip 39: Mnemonic code for generating deterministic keys [https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki](Link)
BIP: 44 Multi-Account Hierarchy for Deterministic Wallets [https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki](Link)

## SPV Wallet

### Go

Interface (Good as command reference) [https://github.com/OpenBazaar/wallet-interface/blob/master/wallet.go](Link)

### Installing

Install and set up go [https://golang.org/doc/install](Link)

Install SPV Wallet using `go get -u github.com/OpenBazaar/spvwallet`, this will install the spv wallet in your GOPATH `~/go/src/github.com/OpenBazaar/spvwallet`

Install dependencies
`cd cmd/spvwallet`
`go get`

Build Wallet
`cd ../..`
`make install`
This should create an spv binary in `~/go/bin`
If you have your go paths ok you should be able to run it

Run
`spvwallet`
This should open a little GUI, in my experience it doesn't work, I use the CLI instead

### CLI

Use the go interface, [https://github.com/OpenBazaar/spvwallet/blob/master/cli/cli.go](cli.go) and [https://github.com/OpenBazaar/spvwallet/blob/master/api/rpc.go](rpc.go) as command reference, not greatly documented for newbies in bitcoin.

e.g.
`spvwallet version`
`spvwallet listaddresses`
