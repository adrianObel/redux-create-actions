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

test('createAction async', t => {
  t.plan(4)

  const type = 'TEST_ASYNC_ACTION'
  const asyncAction = createAction(type, true)

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
