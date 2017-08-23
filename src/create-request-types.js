// @flow

export const START: string = 'START'
export const SUCCESS: string = 'SUCCESS'
export const FAILURE: string = 'FAILURE'

/**
 * Utility function to generate three keyed constants
 * for start success and failure action creators
 * @param  {string} base  action identifier
 * @return {Object}
 */
const createRequestTypes = (base: string): Object => {
  return [START, SUCCESS, FAILURE].reduce((acc: Object, type: string) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export default createRequestTypes

export const suffixes = {
  START,
  SUCCESS,
  FAILURE
}
