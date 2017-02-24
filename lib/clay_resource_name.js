/**
 * Id generator
 * @class ClayResourceName
 * @param {string|object} [id=newIdString()] - Id string
 */
'use strict'

const { LogPrefixes } = require('clay-constants')
const { RESOURCE_PREFIX } = LogPrefixes

/** @lends ClayResourceName */
class ClayResourceName {
  constructor (nameString) {
    const s = this
    if (!nameString) {
      throw new Error(`${RESOURCE_PREFIX} nameString is required`)
    }
    switch (typeof nameString) {
      case 'object':
        nameString = ClayResourceName.nameStringWithValues(nameString)
        break
      default:
        nameString = String(nameString)
        break
    }

    // Parse version expression like "bar@1.0.0"
    if (/@/.test(nameString)) {
      let [ name, version ] = nameString.split('@')
      Object.assign(s, { name, version })
    } else {
      Object.assign(s, { name: nameString })
    }
    s.assert()
  }

  /**
   * Compare to another name
   * @param {string|ClayResourceName} name
   * @returns {boolean}
   */
  is (name) {
    const s = this
    return String(name) === s.toString()
  }

  /**
   * Convert to string
   * @returns {string} String representation
   */
  toString () {
    const s = this
    let { name, version } = s
    return ClayResourceName.nameStringWithValues({ name, version })
  }

  /**
   * Convert to json (Called from JSON.stringify)
   * @returns {string} JSON representation
   */
  toJSON () {
    const s = this
    return s.toString()
  }

  assert () {
    const s = this
    let { name, version } = s
    // TODO Validation
  }

  static nameStringWithValues ({ name, version }) {
    if (version) {
      return [ name, version ].join('@')
    } else {
      return String(name)
    }
  }
}

module.exports = Object.assign(ClayResourceName, {

})
