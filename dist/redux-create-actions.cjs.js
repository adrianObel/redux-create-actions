'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var START = 'START';

var SUCCESS = 'SUCCESS';
var FAILURE = 'FAILURE';

var createRequestTypes = function createRequestTypes(base) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, START, base + '_' + START), _defineProperty(_ref, SUCCESS, base + '_' + SUCCESS), _defineProperty(_ref, FAILURE, base + '_' + FAILURE), _ref;
};

/**
 * Utility function to build action action creator
 * @param  {String} type action creator type
 * @param  {boolean} async flag indicating if action is of async type
 * @return {Function}
 */
var createAction = function createAction(type) {
  var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var actionCreator = function actionCreator(payload, meta) {
    var action = {
      type: type
    };

    if (payload !== undefined) {
      action.payload = payload;

      if (payload instanceof Error) {
        action.error = true;
      }
    }

    if (meta !== undefined) {
      action.meta = meta;
    }

    return action;
  };

  if (!async) {
    return actionCreator;
  }

  var asyncTypes = createRequestTypes(type);

  actionCreator.__async = true;
  actionCreator.start = createAction(asyncTypes.START);
  actionCreator.success = createAction(asyncTypes.SUCCESS);
  actionCreator.failure = createAction(asyncTypes.FAILURE);

  return actionCreator;
};

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
var buildActions = function buildActions(namespace, actions) {
  var actionModule = {
    constants: {},
    actions: {}
  };

  return Object.keys(actions).reduce(function (module, action) {
    var actionCreator = actions[action];

    var _actionCreator = actionCreator(),
        type = _actionCreator.type;

    module.actions[action] = actionCreator;
    module.constants[type] = '@' + namespace + '/' + type;

    if (actionCreator.__async) {
      var _actionCreator$start = actionCreator.start(),
          startType = _actionCreator$start.type;

      module.constants[startType] = '@' + namespace + '/' + startType;

      var _actionCreator$succes = actionCreator.success(),
          successType = _actionCreator$succes.type;

      module.constants[successType] = '@' + namespace + '/' + successType;

      var _actionCreator$failur = actionCreator.failure(),
          failureType = _actionCreator$failur.type;

      module.constants[failureType] = '@' + namespace + '/' + failureType;
    }

    return module;
  }, actionModule);
};

exports.createAction = createAction;
exports.buildActions = buildActions;
