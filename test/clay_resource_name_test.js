/**
 * Test case for clayResourceName.
 * Runs with mocha.
 */
'use strict'

const ClayResourceName = require('../lib/clay_resource_name.js')
const { ok, equal } = require('assert')
const co = require('co')

describe('clay-resource-name', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Clay resource name', () => co(function * () {
    ok(new ClayResourceName('foo@1.0.0'))
    ok(new ClayResourceName('foo@1.0.0').is(new ClayResourceName({ name: 'foo', version: '1.0.0' })))

    let { name, version } = new ClayResourceName('foo@1.0.0')
    equal(name, 'foo')
    equal(version, '1.0.0')

    equal(new ClayResourceName('foo@1.0.0').toString(), 'foo@1.0.0')
  }))
})

/* global describe, before, after, it */
