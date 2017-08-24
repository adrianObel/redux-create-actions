// @flow

import type { ReduxActionModule } from './build-actions.flow'
import type { ActionCreator } from './create-action.flow'
/**
 * Utility function used in conjunction of createAction
 * to generate map of constants and action creators

 * @example
 * buildActions('users', {
 *  loadUsersPage: createAction('LOAD_USERS_PAGE', true)
 * })
 *
 * @param  {string} namespace  module namespace
 * @param  {Object} actions    map of action creators used to generate the module
 * @return {Object}
 */
const buildActions = (namespace: string, actions: Object): ReduxActionModule => {
  const actionModule: ReduxActionModule = {
    constants: {},
    actions: {}
  }

  return Object.keys(actions).reduce((module: ReduxActionModule, action: string) => {
    const actionCreator: ActionCreator = actions[action]

    const { type } = actionCreator()

    module.actions[action] = actionCreator
    module.constants[type] = `@${namespace}/${type}`

    if (actionCreator.__async) {
      const { type: startType } = actionCreator.start()
      module.constants[startType] = `@${namespace}/${startType}`
      const { type: successType } = actionCreator.success()
      module.constants[successType] = `@${namespace}/${successType}`
      const { type: failureType } = actionCreator.failure()
      module.constants[failureType] = `@${namespace}/${failureType}`
    }

    return module
  }, actionModule)
}

export default buildActions
