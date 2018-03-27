'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Utility function to build action action creator
 * @param  {String} type action creator type
 * @return {Function}
 */
var createAction = function createAction(type) {
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

  return actionCreator;
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var START = 'START';

var SUCCESS = 'SUCCESS';
var FAILURE = 'FAILURE';
var createRequestTypes = function createRequestTypes(base) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, START, base + '_' + START), _defineProperty(_ref, SUCCESS, base + '_' + SUCCESS), _defineProperty(_ref, FAILURE, base + '_' + FAILURE), _ref;
};

/**
 * Utility function to build async action action creator
 * @param  {String} type action creator type
 * @return {Function}
 */
var createAsyncAction = function createAsyncAction(type) {
  var asyncActionCreator = createAction(type);
  var asyncTypes = createRequestTypes(type);

  asyncActionCreator.__async = true;
  asyncActionCreator.start = createAction(asyncTypes.START);
  asyncActionCreator.success = createAction(asyncTypes.SUCCESS);
  asyncActionCreator.failure = createAction(asyncTypes.FAILURE);

  return asyncActionCreator;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// eslint-disable-line

var join = function join(a, b) {
  var res = [b];
  if (a) {
    res.unshift(a);
  }

  return res.join('/');
};

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

function module$1(namespace, actions) {
  // eslint-disable-line
  var _namespace = void 0;
  var _actions = void 0;

  // no namespace
  if (!actions && (typeof namespace === 'undefined' ? 'undefined' : _typeof(namespace)) === 'object') {
    _namespace = '';
    _actions = namespace;
  } else {
    _namespace = namespace;
    _actions = actions;
  }

  var actionModule = {
    constants: {},
    actions: {}
  };

  return Object.keys(_actions).reduce(function (m, action) {
    var actionCreator = _actions[action];

    var _actionCreator = actionCreator(),
        type = _actionCreator.type;

    m.actions[action] = actionCreator;
    m.constants[type] = join(_namespace, type);

    if (actionCreator.__async) {
      var _actionCreator$start = actionCreator.start(),
          startType = _actionCreator$start.type;

      m.constants[startType] = join(_namespace, startType);

      var _actionCreator$succes = actionCreator.success(),
          successType = _actionCreator$succes.type;

      m.constants[successType] = join(_namespace, successType);

      var _actionCreator$failur = actionCreator.failure(),
          failureType = _actionCreator$failur.type;

      m.constants[failureType] = join(_namespace, failureType);
    }

    return m;
  }, actionModule);
}

exports.createAction = createAction;
exports.createAsyncAction = createAsyncAction;
exports.module = module$1;
