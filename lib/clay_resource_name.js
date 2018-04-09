/**
 * Id generator
 * @class ClayResourceName
 * @param {string|object} [id=newIdString()] - Id string
 */
'use strict'

const {LogPrefixes, ResourceSpec} = require('clay-constants')
const {RESOURCE_PREFIX} = LogPrefixes

const {NAME_PATTERN, DOMAIN_PATTERN} = ResourceSpec

/** @lends ClayResourceName */
class ClayResourceName {
  constructor (nameString) {
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
    // Parse domain expression like "bar@example.com"
    let [name, domain = null] = nameString.split('@')
    Object.assign(this, {name, domain})
    this.assert()
  }

  /**
   * Compare to another name
   * @param {string|ClayResourceName} name
   * @returns {boolean}
   */
  is (name) {
    return String(name) === this.toString()
  }

  /**
   * Convert to string
   * @returns {string} String representation
   */
  toString () {
    const {name, domain} = this
    return ClayResourceName.nameStringWithValues({name, domain})
  }

  /**
   * Convert to json (Called from JSON.stringify)
   * @returns {string} JSON representation
   */
  toJSON () {
    return this.toString()
  }

  assert () {
    const {name, domain} = this

    if (!NAME_PATTERN.test(name)) {
      throw new Error(`${RESOURCE_PREFIX} Invalid name: "${name}". Allowed pattern is: ${NAME_PATTERN}`)
    }

    if (domain && !DOMAIN_PATTERN.test(domain)) {
      throw new Error(`${RESOURCE_PREFIX} Invalid domain: "${domain}". Allowed pattern is: ${DOMAIN_PATTERN}`)
    }
  }

  static nameStringWithValues ({name, domain = null}) {
    const hasDomain = domain && (typeof domain === 'string')
    if (hasDomain) {
      return [name, domain].map(String).join('@')
    } else {
      return String(name)
    }
  }
}

module.exports = Object.assign(ClayResourceName, {})
