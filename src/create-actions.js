/**
 * Utility function to build action action creator
 * @param  {String} type action creator type
 * @return {Function}
 */
export default createAction = type => (payload, meta) => {
  const action = {
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
