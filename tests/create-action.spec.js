// @flow

import test from 'tape'
import createAction from '../src/create-action'
import type { ActionCreator } from '../src/create-action.flow'

test('createAction', t => {
  t.plan(7)

  let payload: ?any = null
  let meta: ?any = null
  const type: string = 'TEST_ACTION'
  const action: ActionCreator = createAction(type)

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

test('createAction async', t => {
  t.plan(5)

  const type: string = 'TEST_ASYNC_ACTION'
  const asyncAction: ActionCreator = createAction(type, true)

  t.equal(asyncAction.__async, true)

  t.deepEqual(asyncAction(), {
    type
  })

  t.deepEqual(asyncAction.start(), {
    type: `${type}_START`
  })

  t.deepEqual(asyncAction.success(), {
    type: `${type}_SUCCESS`
  })

  t.deepEqual(asyncAction.failure(), {
    type: `${type}_FAILURE`
  })
})

test('createAction with error', t => {
  t.plan(1)

  const type: string = 'ERROR_ACTION'
  const errorAction: ActionCreator = createAction(type)
  const payload = new Error('Failure')

  t.deepEqual(errorAction(payload), {
    type,
    payload,
    error: true
  })
})
