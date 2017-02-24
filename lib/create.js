/**
 * Create a ClayResourceName instance
 * @function create
 * @param {...*} args
 * @returns {ClayResourceName}
 */
'use strict'

const ClayResourceName = require('./clay_resource_name')

/** @lends create */
function create (...args) {
  return new ClayResourceName(...args)
}

module.exports = create
