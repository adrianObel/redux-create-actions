// @flow

import type { ReduxActionModule, ActionCreator } from './types.flow'

/**
 * Utility function used to generate map of constants and
 * action creators
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
      const { type: failureType } = actionCreator.start()
      module.constants[failureType] = `@${namespace}/${failureType}`
    }

    return module
  }, actionModule)
}

export default buildActions
