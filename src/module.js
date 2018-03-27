// @flow
import type { AsyncActionCreator } from './create-async-action'

type ActionMap = {
  [string]: AsyncActionCreator
}

export type ReduxActionModule = {
  constants: {
    [string]: string
  },
  actions: ActionMap
}

declare function module (namespace: string, actions: ActionMap): ReduxActionModule
declare function module (actions: ActionMap): ReduxActionModule // eslint-disable-line

const join = (a: ?string, b: string): string => {
  const res = [b]
  if (a) {
    res.unshift(a)
  }

  return res.join('/')
}

/**
 * Utility function used in conjunction of createAction
 * to generate map of constants and action creators

 * @example
 * module('users', {
 *  loadUsersPage: createAsyncAction('LOAD_USERS_PAGE')
 * })
 *
 * @param  {string} namespace  module namespace
 * @param  {Object} actions    map of action creators used to generate the module
 * @return {Object}
 */
function module (namespace, actions) { // eslint-disable-line
  let _namespace: string
  let _actions: ActionMap

  // no namespace
  if (!actions && typeof namespace === 'object') {
    _namespace = ''
    _actions = namespace
  } else {
    _namespace = namespace
    _actions = actions
  }

  const actionModule: ReduxActionModule = {
    constants: {},
    actions: {}
  }

  return Object.keys(_actions).reduce((m: ReduxActionModule, action: string): ReduxActionModule => {
    const actionCreator = _actions[action]

    const { type } = actionCreator()

    m.actions[action] = actionCreator
    m.constants[type] = join(_namespace, type)

    if (actionCreator.__async) {
      const { type: startType } = actionCreator.start()
      m.constants[startType] = join(_namespace, startType)
      const { type: successType } = actionCreator.success()
      m.constants[successType] = join(_namespace, successType)
      const { type: failureType } = actionCreator.failure()
      m.constants[failureType] = join(_namespace, failureType)
    }

    return m
  }, actionModule)
}

export default module
