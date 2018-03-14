import test from 'tape'
import createAsyncAction from '../src/create-async-action'

test('createAsyncAction', t => {
  t.plan(5)

  const type = 'TEST_ASYNC_ACTION'
  const asyncAction = createAsyncAction(type, true)

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
