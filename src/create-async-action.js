// @flow

import createRequestTypes from './create-request-types'
import createAction from './create-action'
import type { ActionCreator } from './create-action'

export type AsyncActionCreator = ActionCreator | {
  (): ActionCreator,
  __async: true,
  start: ActionCreator,
  success: ActionCreator,
  failure: ActionCreator
}

/**
 * Utility function to build async action action creator
 * @param  {String} type action creator type
 * @return {Function}
 */
const createAsyncAction = (type: string): AsyncActionCreator => {
  const asyncActionCreator: AsyncActionCreator = createAction(type)
  const asyncTypes = createRequestTypes(type)

  asyncActionCreator.__async = true
  asyncActionCreator.start = createAction(asyncTypes.START)
  asyncActionCreator.success = createAction(asyncTypes.SUCCESS)
  asyncActionCreator.failure = createAction(asyncTypes.FAILURE)

  return asyncActionCreator
}

export default createAsyncAction
