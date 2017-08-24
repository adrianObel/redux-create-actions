// @flow

import test from 'tape'
import buildActions from '../src/build-actions'
import type { ReduxActionModule } from '../src/build-actions.flow'
import type { ActionCreator } from '../src/create-action.flow'

const mockCreateAction = (type: string): ActionCreator => (payload, meta) => ({
  type,
  payload,
  meta
})

const mockCreateAsyncAction = (type: string): ActionCreator => {
  const actionCreator: ActionCreator = (payload, meta) => ({ type, payload, meta })
  actionCreator.__async = true

  actionCreator.start = mockCreateAction(`${type}_START`)
  actionCreator.success = mockCreateAction(`${type}_SUCCESS`)
  actionCreator.failure = mockCreateAction(`${type}_FAILURE`)

  return actionCreator
}

test('buildActions', t => {
  t.plan(4)

  const namespace: string = 'test-module'
  const testActionCreator = mockCreateAction('TEST_CASE')
  const asyncTestActionCreator = mockCreateAsyncAction('ASYNC_TEST_CASE')

  const actionCreators: Object = {
    testCase: testActionCreator,
    asyncTestCase: asyncTestActionCreator
  }

  const expected: ReduxActionModule = {
    constants: {
      TEST_CASE: `@${namespace}/TEST_CASE`,
      ASYNC_TEST_CASE: `@${namespace}/ASYNC_TEST_CASE`,
      ASYNC_TEST_CASE_START: `@${namespace}/ASYNC_TEST_CASE_START`,
      ASYNC_TEST_CASE_SUCCESS: `@${namespace}/ASYNC_TEST_CASE_SUCCESS`,
      ASYNC_TEST_CASE_FAILURE: `@${namespace}/ASYNC_TEST_CASE_FAILURE`
    },
    actions: {
      testCase: testActionCreator,
      asyncTestCase: asyncTestActionCreator
    }
  }

  t.deepEqual(buildActions(namespace, actionCreators), expected)

  t.equal(typeof asyncTestActionCreator.start, 'function')
  t.equal(typeof asyncTestActionCreator.success, 'function')
  t.equal(typeof asyncTestActionCreator.failure, 'function')
})
