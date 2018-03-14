// @flow

export type Action = {
  type: string,
  payload?: any,
  meta?: any,
  error?: boolean
}

export type ActionCreator = (payload: any, meta: any) => Action

/**
 * Utility function to build action action creator
 * @param  {String} type action creator type
 * @return {Function}
 */
const createAction = (type: string): ActionCreator => {
  const actionCreator: ActionCreator = (payload, meta) => {
    const action: Action = {
      type
    }

    if (payload !== undefined) {
      action.payload = payload

      if (payload instanceof Error) {
        action.error = true
      }
    }

    if (meta !== undefined) {
      action.meta = meta
    }

    return action
  }

  return actionCreator
}

export default createAction
