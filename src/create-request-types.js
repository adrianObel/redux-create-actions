// @flow

import type { RequestTypes } from './create-request-types.flow'

export const START: 'START' = 'START'
export const SUCCESS: 'SUCCESS' = 'SUCCESS'
export const FAILURE: 'FAILURE' = 'FAILURE'

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
