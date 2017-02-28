/**
 * Id generator
 * @class ClayResourceName
 * @param {string|object} [id=newIdString()] - Id string
 */
'use strict'

const { LogPrefixes, ResourceSpec, ResourceVersioning } = require('clay-constants')
const { RESOURCE_PREFIX } = LogPrefixes

const { LATEST_VERSION } = ResourceVersioning
const { NAME_PATTERN, VERSION_PATTERN } = ResourceSpec

const numberUnlessNaN = (value) => isNaN(Number(value)) ? value : Number(value)

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
    // Parse version expression like "bar@1"
    let [ name, version = LATEST_VERSION ] = nameString.split('@')
    Object.assign(s, {
      name,
      version: numberUnlessNaN(version)
    })
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

    if (!NAME_PATTERN.test(name)) {
      throw new Error(`${RESOURCE_PREFIX} Invalid name: "${name}". Allowed pattern is: ${NAME_PATTERN}`)
    }

    if (!VERSION_PATTERN.test(version)) {
      throw new Error(`${RESOURCE_PREFIX} Invalid version: "${version}". Allowed pattern is: ${VERSION_PATTERN}`)
    }
  }

  static nameStringWithValues ({ name, version = LATEST_VERSION }) {
    if (version) {
      return [ name, version ].join('@')
    } else {
      return String(name)
    }
  }
}

module.exports = Object.assign(ClayResourceName, {})
