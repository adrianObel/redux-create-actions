// @flow

export type Action = {
  type: string,
  payload?: any,
  meta?: any,
  error?: boolean
}

export type ActionCreator = (payload?: any, meta?: any) => Action
