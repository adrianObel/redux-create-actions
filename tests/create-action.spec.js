// @flow

import test from 'tape'
import createAction from '../src/create-action'

test('createAction', t => {
  t.plan(7)

  let payload = null
  let meta = null
  const type = 'TEST_ACTION'
  const action = createAction(type)

  t.deepEqual(action(), {
    type
  })

  payload = 0
  t.deepEqual(action(payload), {
    type,
    payload
  })

  payload = null
  t.deepEqual(action(payload), {
    type,
    payload
  })

  payload = { foo: 'bar' }
  t.deepEqual(action(payload), {
    type,
    payload
  })

  meta = 0
  t.deepEqual(action(undefined, meta), {
    type,
    meta
  })

  meta = null
  t.deepEqual(action(undefined, meta), {
    type,
    meta
  })

  meta = { foo: 'bar' }
  t.deepEqual(action(undefined, meta), {
    type,
    meta
  })
})

test('createAction with error', t => {
  t.plan(1)

  const type = 'ERROR_ACTION'
  const errorAction = createAction(type)
  const payload = new Error('Failure')

  t.deepEqual(errorAction(payload), {
    type,
    payload,
    error: true
  })
})
