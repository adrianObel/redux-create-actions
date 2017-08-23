// @flow

type Action = {
  type: string,
  payload?: any,
  meta?: any,
}

/**
 * Utility function to build action action creator
 * @param  {String} type action creator type
 * @return {Function}
 */
const createAction = (type: string): Function => (payload: ?any, meta: ?any): Object => {
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

export default createAction
