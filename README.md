# Bitcoin Payments API (BPA)

Microservice to accept bitcoin payments

## One Address per payment

### Definitions

Charge: When a user request to make a payment a "Charge" is created, for this a bitcoin Address is created and monitored, charges are temporal and should only live for X ammount of minutes.

Store Address (SA): One address that its owned by the store

BPA Comissions Address (BPACA): One address owned by the BPA system

### Buying process

1) Registered User enters Store.com
2) User resquest to make a payment
3) Store request a new "Charge" to the Bitcoin Payments API and asociates the Address with the user
4) User makes the payment to the wallet
5) The BPA waits for x confirmations
    then transfer 2% of original ammount + transfer free to BPACA
    and transfer the remaining ammount to SA
6) Store calls the BPA for information about this address and receives that a new payment was done for X bitcoins
7) Store creates a virtual credit for the user

### Details

When the Charge time expires the address is sent to an "expired" storage, along with its public and private keys, this address will stop being monitored and never be used again.

### Proposed Endpoints

#### Creating a charge

Request

```sh
curl -X POST https://bpa.io/api/v1/charge
```

Response

```sh
{
  "address": "12AaMuRnzw6vW6s2KPRAGeX53meTf8JbZS",
  "expires": "2019-10-11T02:34:27.769Z"
}
```

#### Getting a charge

Request

```sh
curl https://bpa.io/api/v1/charge/12AaMuRnzw6vW6s2KPRAGeX53meTf8JbZS
```

Response

```sh
{
  "address": "12AaMuRnzw6vW6s2KPRAGeX53meTf8JbZS",
  "expires": "2019-10-11T02:34:27.769Z",
  "payment_status": "completed",
  "original_ammount": 0.3,
  "final_ammount:": 0.2892636
}
```

Payment statuses:

new: Charge has been created

pending: A transaction has been received and waiting for confirmation or payment has been sent to SA address and waiting for confirmations.

completed: Payment has been sent to Store Address and has X confirmations

## Inspired by

https://github.com/OpenBazaar/spvwallet

https://commerce.coinbase.com/docs/

https://www.blockchain.com/api/blockchain_wallet_api

https://bitpay.com/docs/create-invoice
