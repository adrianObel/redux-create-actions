import test from 'tape'
import createRequestTypes, { suffixes } from '../lib/create-request-types'

test('createRequestTypes', t => {
  t.plan(1)

  const base = 'FOO'
  const constants = createRequestTypes(base)
  const expected = {
    [suffixes.START]: `${base}_${suffixes.START}`,
    [suffixes.SUCCESS]: `${base}_${suffixes.SUCCESS}`,
    [suffixes.FAILURE]: `${base}_${suffixes.FAILURE}`
  }

  t.deepEqual(constants, expected)
})
