// @flow

import createRequestTypes from './create-request-types'
import type { Action, ActionCreator } from './types.flow'

/**
 * Utility function to build action action creator
 * @param  {String} type action creator type
 * @param  {boolean} async flag indicating if action is of async type
 * @return {Function}
 */
const createAction = (type: string, async: boolean = false): ActionCreator => {
  const actionCreator = (payload?: any, meta?: any): Action => {
    const action: Action = {
      type
    }

    if (payload !== undefined) {
      action.payload = payload
    }

    if (meta !== undefined) {
      action.meta = meta
    }

    return action
  }

  if (!async) { return actionCreator }

  const asyncTypes = createRequestTypes(type)

  actionCreator.__async = true
  actionCreator.start = createAction(asyncTypes.START)
  actionCreator.success = createAction(asyncTypes.SUCCESS)
  actionCreator.failure = createAction(asyncTypes.FAILURE)

  return actionCreator
}

export default createAction
