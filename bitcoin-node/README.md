# How to set up a Bitcoin Node

## Monitoring

We are using screen and nmon to monitor the server

[Screen CheatSheet](http://neophob.com/2007/04/gnu-screen-cheat-sheet/)

`screen -X -S [session # you want to kill] quit`

## JSON RPC

[RPC Docs](https://bitcoincore.org/en/doc/0.19.0/rpc/zmq/getzmqnotifications/)

TODO: https://medium.com/@devontem/nodejs-express-using-ssh-to-access-mysql-remotely-60372832dd08

```bash
# This sends your password in clear text all over the internet
# Enable https or use ssh instead
curl --user 'user:password' --data-binary '{"jsonrpc":"1.0","id":"curltext","method":"getmininginfo","params":[]}' -H 'content-type:text/plain;' http://server.ip.1.2:8332 -v
```

## Detecting transactions

blocknotify
walletnotify
https://github.com/bitcoin/bitcoin/blob/master/doc/zmq.md
https://bitcoin.stackexchange.com/questions/40752/what-is-the-use-case-of-bitcoind-zeromq
https://bitcoindev.network/accessing-bitcoins-zeromq-interface/

## Resources

[Learning Bitcoin from the Command Line](https://github.com/ChristopherA/Learning-Bitcoin-from-the-Command-Line)
[Running a full Bitcoin Node](https://bitcoin.org/en/full-node)

https://bitcointalk.org/index.php?topic=417997.0

[bitcoin.conf](https://github.com/bitcoin/bitcoin/blob/master/share/examples/bitcoin.conf)

[Install Notes wolfmcnally](https://wolfmcnally.com/115/developer-notes-setting-up-a-bitcoin-node-on-aws/)
sudo apt-get update && sudo apt-get upgrade
https://appuals.com/fix-could-not-open-lock-file-var-lib-dpkg-lock/

TODO: Unnatended upgrades
https://dev.to/setevoy/debian-unattended-upgrades-automatic-upgrades-installation-with-email-notifications-via-aws-ses-59nk

[Bitcoin Repository](https://github.com/bitcoin/bitcoin)
[Satoshi's Whitepaper](https://bitcoincore.org/bitcoin.pdf)

https://en.bitcoinwiki.org/wiki/Main_Page

https://bitcoin.stackexchange.com/questions/24457/how-do-i-use-walletnotify
https://bitcointalk.org/index.php?topic=203438.0
https://github.com/damonp/walletnotify/blob/master/walletnotify.php



## Official instructions

tar xzf bitcoin-0.18.0-x86_64-linux-gnu.tar.gz
sudo install -m 0755 -o root -g root -t /usr/local/bin bitcoin-0.18.0/bin/*
bitcoind -daemon
crontab -e
@reboot bitcoind -daemon
