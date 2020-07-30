const axios = require('axios')
const crypto = require('crypto')

/**
 * BTU Reward Initialization
 *
 * @param {string} privateKeyString Private key
 * @param {string} publicKeyString Public key
 * @param {boolean} url Server url
 */
function BTUSender(privateKeyString, publicKeyString, url) {
  this.privateKey = crypto.createPrivateKey(privateKeyString)
  this.publicKey = crypto.createPublicKey(publicKeyString)
  this.publicKeyString = publicKeyString

  this.url = url
  this.route = 'sender'
}

/**
 * Calculates the signature on some data
 *
 * @param data The data to calculate the signature on
 * @return {string} The calculated signature
 */
BTUSender.prototype._createSignature = function(data) {
  const sign = crypto.createSign('SHA256')
  sign.write(JSON.stringify(data, Object.keys(data).sort()))
  sign.end()

  return sign.sign(this.privateKey, 'hex')
}

/**
 * Post payload to BTU API
 *
 * @param {Object} payload 
 */
BTUSender.prototype._postRequest = async function(payload) {
  const authHeader = ''

  const opts = {
    method: 'POST',
    url: this.url + '/' + this.route,
    headers: authHeader,
    json: true,
    data: payload,
  }

  try {
    const req = await axios.request(opts)
    return req.data
  } catch (e) {
    return (e.response.data)
  }
}

/**
 * Create a new request
 *
 * @param {Object} payload
 * @return {Object} 
 */
BTUSender.prototype.sendRequest = async function (payload) {
  // Add timestamp to payload
  payload.timestamp = new Date().getTime()

  // Calculate signature on payload
  payload.signature = this._createSignature(payload)

  // Add public key to payload
  payload.key = this.publicKeyString

  // Post request
  return this._postRequest(payload)
}

module.exports = BTUSender
