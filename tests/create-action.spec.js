import test from 'tape'
import createAction from '../lib/create-action'

test('createAction', t => {
  t.plan(7)

  let payload = null
  let meta = null
  const type = 'TEST_ACTION'
  const action = createAction('TEST_ACTION')

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
