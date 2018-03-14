// @flow

import createRequestTypes from './create-request-types'
import createAction from './create-action'
import type { ActionCreator } from './create-action'

/**
 * Utility function to build async action action creator
 * @param  {String} type action creator type
 * @return {Function}
 */
const createAsyncAction = (type: string): ActionCreator => {
  const actionCreator = createAction(type)
  const asyncTypes = createRequestTypes(type)

  actionCreator.__async = true
  actionCreator.start = createAction(asyncTypes.START)
  actionCreator.success = createAction(asyncTypes.SUCCESS)
  actionCreator.failure = createAction(asyncTypes.FAILURE)

  return actionCreator
}

export default createAsyncAction
