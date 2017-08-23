// @flow

export type Action = {
  type: string,
  payload?: any,
  meta?: any
}

export type ActionCreator = (payload?: any, meta?: any) => Action

export type RequestTypes = {
  START: string,
  SUCCESS: string,
  FAILURE: string
}

export type ReduxActionModule = {
  constants: Object,
  actions: Object
}
