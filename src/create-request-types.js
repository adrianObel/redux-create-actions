// @flow

export type RequestTypes = {
  START: string,
  SUCCESS: string,
  FAILURE: string
}

export const START = 'START'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const suffixes = {
  START,
  SUCCESS,
  FAILURE
}

/**
 * Utility function to generate three keyed constants
 * for start success and failure action creators
 * @param  {string} base  action identifier
 * @return {Object}
 */
const createRequestTypes = (base: string): RequestTypes => ({
  [START]: `${base}_${START}`,
  [SUCCESS]: `${base}_${SUCCESS}`,
  [FAILURE]: `${base}_${FAILURE}`
})

export default createRequestTypes
