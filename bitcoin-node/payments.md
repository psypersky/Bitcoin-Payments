# They payments protocol using bitcoin-cli

## Create an address to receive a payment

```sh
bitcoin-cli getnewaddress
148dUPpEm3nLHM3tRC5WhJpQqnLAfF8FZA
```

## Detecting the transaction

```sh
# Get most recent transaction
bitcoin-cli listtransactions "*" 1 0

# Get second most recent transaction
bitcoin-cli listtransactions "*" 1 1

# Get third most recent transaction
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

## Calculate Bitcoin Payments comission (fee)

0.00041737 * 0.02 = BTC

## Create simple raw transaction

txid+vout=UTXO

utxo_txid="ee9805676271f6244eba94c3d1a48b303a8f8359bf711c630eb6f2ea339d0e72"
utxo_vout="0"

recipient="n2eMqTT929pb1RDNuqEnxdaLau1rxy3efi"

bitcoin-cli createrawtransaction
'''[
     {
       "txid": "'$your_txid'",
       "vout": '$your_vout'
      }
]'''
'''{
   "'$your_recipient'": bitcoin_amount
 }'''


rawtxhex=$(bitcoin-cli createrawtransaction '''[ { "txid": "'$utxo_txid'", "vout": '$utxo_vout' } ]''' '''{ "'$recipient'": 0.0795 }''')
echo $rawtxhex

the amount that you will pay as a fee is always equal to the amount of your input minus the amount of your output

bitcoin-cli decoderawtransaction $rawtxhex

bitcoin-cli signrawtransaction $rawtxhex

bitcoin-cli sendrawtransaction $signedtx

## The protocol

First we need a transaction that we haven't processed, we start with the first transaction, note that instead of using commands to list transaction we are going to listen for new transaction with a script.

$ bitcoin-cli listtransactions "*" 1 2
{...}

$ bitcoin-cli gettransaction 784d7a19c634c2c6bbc19f7d1b4bb64b098b1476eec234b5c0c2b578fa9ced5c
{
  "amount": 0.00041737,
  "confirmations": 136,
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

Get the transaction id

$ utxo_txid_1=$(bitcoin-cli gettransaction 784d7a19c634c2c6bbc19f7d1b4bb64b098b1476eec234b5c0c2b578fa9ced5c | jq -r '.txid')
$ echo $utxo_txid_1
$784d7a19c634c2c6bbc19f7d1b4bb64b098b1476eec234b5c0c2b578fa9ced5c

Get the vout index

$ utxo_vout_1=$(bitcoin-cli gettransaction 784d7a19c634c2c6bbc19f7d1b4bb64b098b1476eec234b5c0c2b578fa9ced5c | jq -r '.details[0].vout')
$ echo $utxo_vout_1
0

We define our fee (This should be globaly defined)

$ bpfee=0.02
$ echo $bpfee
0.02

Define our fee address (This should be globaly defined)

$ FEE_COLLECTOR_ADDRESS=19TyLaCmLqAyTFrsm5seKP52cs5wFVyLNZ
$ echo $FEE_COLLECTOR_ADDRESS
19TyLaCmLqAyTFrsm5seKP52cs5wFVyLNZ

Define store address (This should be globaly defined)
$ STORE_ADDRESS=12LPPRd2B9vAzXjrARw88Pnk7ZpNqoSLNH
$ echo $STORE_ADDRESS

Take the ammount of the transaction

$ txoriginalamount=$(bitcoin-cli gettransaction 784d7a19c634c2c6bbc19f7d1b4bb64b098b1476eec234b5c0c2b578fa9ced5c | jq -r '.amount')
$ echo $txoriginalamount
0.00041737

Calculate the ammount that we need to send to the FEE_COLLECTOR_ADDRESS

$ echo "scale=9; 0.00041737*0.02" | bc
.000008347

Since bitcoin is only divisible to the 8th decimal place we round up

$ feeamount=.00000835
$ echo $feeamount

Calculate the store address amount - fee

TODO: How to get the bytes of the transaction to calculate the fee?

Cost of standard transaction 1 input 2 outputs 0.00000567 BTC (2.543 sat/B - 0.636 sat/WU - 223 bytes)

0.00041737 - 0.00000835 = 0.00040902
0.00040902 - 0.00000567 = 0.00040335

We create a transaction

Note that amounts less than one bitcoin need a cero first

$ rawtxhex2=$(bitcoin-cli -named createrawtransaction inputs='''[ { "txid": "'$utxo_txid_1'", "vout": '$utxo_vout_1' } ]''' outputs='''[ { "'$FEE_COLLECTOR_ADDRESS'": 0.00000835 }, { "'$STORE_ADDRESS'": 0.00040335 } ]''')
$ echo $rawtxhex2
02000000015ced9cfa78b5c2c0b534c2ee76148b094bb64b1b7d9fc1bbc6c234c6197a4d780000000000ffffffff0243030000000000001976a9145cdad97362d5cd8ce3065c3bada7bae3eee3961588ac8f9d0000000000001976a9140ea2b76ae526073fa838b1b29c8976b5709ada1788ac00000000

We confirm that the fee is what we intended

$ ./tx-fee-calc.sh $rawtxhex2
.00000567

Check our transaction

$ bitcoin-cli -named decoderawtransaction hexstring=$rawtxhex2

Sign our transaction

$ signedtx=$(bitcoin-cli -named signrawtransactionwithwallet hexstring=$rawtxhex2 | jq -r '.hex')
$ echo $signedtx
02000000015ced9cfa78b5c2c0b534c2ee76148b094bb64b1b7d9fc1bbc6c234c6197a4d78000000006a47304402204e5b8c158f0b02b1f499b34ee6225eb58a5e1c1f3e9f2e739e79e3f674867de802204261d68907e1aea95d2ccdfc6aaab08bb1e8cb09abc3e83328a649397f4cf857012102867745753c8fa753479ca22b8cb674a875d84caab526a0740fbfba1bf3fa2a57ffffffff0243030000000000001976a9145cdad97362d5cd8ce3065c3bada7bae3eee3961588ac8f9d0000000000001976a9140ea2b76ae526073fa838b1b29c8976b5709ada1788ac00000000

bitcoin-cli -named sendrawtransaction hexstring=$signedtx