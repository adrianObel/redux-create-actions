// @flow

import test from 'tape'
import createRequestTypes, { suffixes } from '../src/create-request-types'
import type { RequestTypes } from '../src/types.flow'

test('createRequestTypes', t => {
  t.plan(1)

  const base: string = 'FOO'
  const constants: RequestTypes = createRequestTypes(base)
  const expected = {
    [suffixes.START]: `${base}_${suffixes.START}`,
    [suffixes.SUCCESS]: `${base}_${suffixes.SUCCESS}`,
    [suffixes.FAILURE]: `${base}_${suffixes.FAILURE}`
  }

  t.deepEqual(constants, expected)
})

test('suffixes', t => {
  t.plan(3)

  t.equal(suffixes.START, 'START')
  t.equal(suffixes.SUCCESS, 'SUCCESS')
  t.equal(suffixes.FAILURE, 'FAILURE')
})
