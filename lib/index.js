/**
 * Name object of ClayDB resources
 * @module clay-resource-name
 */

'use strict'

const create = require('./create')
const ClayResourceName = require('./clay_resource_name')

const lib = create.bind(this)

Object.assign(lib, ClayResourceName, {
  create,
  ClayResourceName
})

module.exports = lib
