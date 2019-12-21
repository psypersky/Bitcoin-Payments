# FAQ

## Bitcoin is not starting

Check ~/.bitcoin/debug.log
`tail -f ~/.bitcoin/debug.log`

## Can't connect with JSON RPC from external ip

Add `rpcbind=0.0.0.0` and `rpcallowip=your.ip.2.3/24` to bitcoin.conf
Warning: This exposes your node to the internet
Warning 2: If you use http you will send your password in clear text all over the internet
