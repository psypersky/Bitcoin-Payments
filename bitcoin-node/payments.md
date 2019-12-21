# They payments protocol using bitcoin-cli

## Create an address to receive a payment

```sh
bitcoin-cli getnewaddress
148dUPpEm3nLHM3tRC5WhJpQqnLAfF8FZA
```

## Detecting the transaction

```sh
# Get transaction 1
bitcoin-cli listtransactions "*" 1 0

# Get transaction 2
bitcoin-cli listtransactions "*" 1 1

# Get transaction 3
bitcoin-cli listtransactions "*" 1 2

# Get transaction details
bitcoin-cli gettransaction $txid
```

```json
{
  "amount": 0.00041737,
  "confirmations": 7,
  "blockhash": "000000000000000000023c467df326a7c8860e5b82ac36f4e17843e541fa16af",
  "blockindex": 1287,
  "blocktime": 1576886722,
  "txid": "784d7a19c634c2c6bbc19f7d1b4bb64b098b1476eec234b5c0c2b578fa9ced5c",
  "walletconflicts": [
  ],
  "time": 1576886650,
  "timereceived": 1576886650,
  "bip125-replaceable": "no",
  "details": [
    {
      "address": "148dUPpEm3nLHM3tRC5WhJpQqnLAfF8FZA",
      "category": "receive",
      "amount": 0.00041737,
      "label": "",
      "vout": 0
    }
  ],
  "hex": "01000000018b48990765ba03942006ec87c91b30e4743453e48883094c025227c38a0caa28010000006a473044022007ec6b943faf0c797472d302fb82eb953d713e5f05fb10d28a157a44afe1733002203b9a7fe676d82c667d60630e2425900f5b0ff1b7c735c45cf737077c6c734aa201210293114fdd000eceb6bda55f7d4911fde4ba535a144cec30a890b13a38ed5490f5ffffffff0209a30000000000001976a9142259bc1072d3b97d894b00ff8f1f4792ce90c2a388ac84a46800000000001976a9141ff455f3785d5b580c474ae516bae5ff7c33cd2f88ac00000000"
}
```

We received 0.00041737 BTC, aproximately 3 USD

## Take our the fee

0.00041737 * 0.02 = BTC

