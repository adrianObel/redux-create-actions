// @flow

export type ReduxActionModule = {
  constants: Object,
  actions: Object
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
const module = (namespace: string, actions: Object): ReduxActionModule => {
  const actionModule = {
    constants: {},
    actions: {}
  }

  return Object.keys(actions).reduce((m: ReduxActionModule, action: string): ReduxActionModule => {
    const actionCreator = actions[action]

    const { type } = actionCreator()

    m.actions[action] = actionCreator
    m.constants[type] = `@${namespace}/${type}`

    if (actionCreator.__async) {
      const { type: startType } = actionCreator.start()
      m.constants[startType] = `@${namespace}/${startType}`
      const { type: successType } = actionCreator.success()
      m.constants[successType] = `@${namespace}/${successType}`
      const { type: failureType } = actionCreator.failure()
      m.constants[failureType] = `@${namespace}/${failureType}`
    }

    return m
  }, actionModule)
}

export default module
