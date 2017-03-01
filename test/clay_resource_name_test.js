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
    ok(new ClayResourceName('foo@example.com'))
    ok(new ClayResourceName('foo@example.com').is(new ClayResourceName({ name: 'foo', domain: 'example.com' })))

    let { name, domain } = new ClayResourceName('foo@example.com')
    equal(name, 'foo')
    equal(domain, 'example.com')

    equal(new ClayResourceName('foo@example.com').toString(), 'foo@example.com')
    equal(new ClayResourceName('foo').toString(), 'foo')
    equal(new ClayResourceName('foo').domain, null)
  }))
})

/* global describe, before, after, it */
