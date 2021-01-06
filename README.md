# BTU Sender

Node.js client for BTU request API

  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [Instantiation](#instantiation)
  - [Methods](#methods)
    - [**sendRequest**](#sendRequest)

## Getting started

### Installation

```
npm install btu-sender --save
```

### Instantiation

```javascript
const BTUSender = require('btu-sender');

const myBtuSender = new BTUSender(privateKey, publicKey, url);
```

`privateKey` and `publicKey` are private and public keys; please contact us to generate them.

`url` is the url of the distribution server.

## Methods

### **sendRequest()**

The method `sendRequest` creates a new send request.

#### Parameters

 | parameter | type | mandatory | description |
 | --- | --- | --- | --- |
 | `amount` | number | **yes** | Amount to send |
 | `currency` | string | **yes** | Currency code ('BTU', 'EUR', 'USD', etc.) |
 | `recipient` | string | **yes** | Wallet address of the recipient. 42 characters: "0x" followed by 40 hexadecimal characters |
 | `network` | string | no | Network on which to perform the request ("mainnet", "ropsten", "mumbai", etc.). Default "mainnet". |
 | `from` | string | no | Minimal date when the request must be performed. (Format `YYYY-MM-DDTHH:MM:SS`) |
 | `push` | number | no | `1` if a push notification must be sent to the recipient when the transaction is performed, `0` otherwise. (default is `1`) |
 | `priority` | number | no | `0` if normal priority, `1` otherwise. (default is `0`) |
 | `commission_payer` | number | no | `0` if the commission is paid by the recipient, `1` if paid by the sender. (if omitted, default settings are applied) |
 | `test` | number | no | When set to `1`, the request will not result into a BTU distribution. (default is `0`)
 
#### Examples

This example creates a send request for 1 BTU to the address 0x0123456789012345678901234567890123456789 on the Mainnet network.

```javascript
const res = myBtuSender.sendRequest({
  amount: 1,
  currency: 'BTU',
  recipient: '0x0123456789012345678901234567890123456789',
  network: 'mainnet'
})
.then(res => {
  console.log('BTU Sender Response:', res);
});
```

This example creates a test send request for 2 EUR to the address 0x0123456789012345678901234567890123456789 on Ropsten, to be performed after september 1st, 2020, with a higher priority. The commission is to be paid by the recipient. No push notification is required.

```javascript
const res = myBtuSender.sendRequest({
  amount: 2,
  currency: 'EUR',
  recipient: '0x0123456789012345678901234567890123456789',
  network: 'ropsten',
  from: '2020-09-01T00:00:00',
  push: 0,
  priority: 0,
  commission_payer: 0,
  test: 0
})
.then(res => {
  console.log('BTU Sender Response:', res);
});
```

## License

This project is licensed under a proprietary License- see the [LICENSE](LICENSE) file for details
