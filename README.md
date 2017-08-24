# redux-create-actions

`redux-create-actions` is a library that helps construct FSA compliant action creators and massively decreasing the amount of boilerplate necessary to generate constants and action creators.

## Getting started
### install
```bash
$ npm install --save redux-create-actions
```
or
```bash
$ yarn add redux-create-actions
```

## Usage
Suppose we need to generate action creators and constants to fetch reddit posts and log out

```js
// actions/reddit.js

import { buildActions, createAction } from 'redux-create-actions'

const {
  actions,
  constants
} = buildActions('reddit', {
  logout: createAction('LOGOUT'),
  loadPosts: createAction('LOAD_POSTS', true)
})

export const constants
export default actions
```

The `buildActions` block noted in the example above would return an object with a shape of
```js
{
  constants: {
    'LOGOUT': '@reddit/LOGOUT',
    'LOAD_POSTS': '@reddit/LOAD_POSTS',
    'LOAD_POSTS_START': '@reddit/LOAD_POSTS_START',
    'LOAD_POSTS_SUCCESS': '@reddit/LOAD_POSTS_SUCCESS',
    'LOAD_POSTS_FAILURE': '@reddit/LOAD_POSTS_FAILURE'
  },
  actions: {
    logout: Fn,
    loadPosts: Fn
    // loadPosts.start: Fn
    // loadPosts.success: Fn
    // loadPosts.failure: Fn
  }
}
```

Like in the example above, when `actionCreator` is called with `true` as its second argument (async), it will generate three more action creators and constants for request tracking.

## Documentation
There are two utility functions exported from the root of the module.

### createAction
```js
createAction(constant[, async])
```

* `constant` &lt;string&gt;
* `async` &lt;boolean?&gt;

Utility function for generating action creators

### buildActions
```js
buildActions(namespace, actionMap)
```
* `namespace` &lt;string&gt;
* `actionMap` &lt;Object&gt;

Utility function used to bulk construct actions and constants.

The `actionMap` is a javascript object keyed with the action creator's name and a call to the `createAction` function
```js
// actionMap
{
  likeRepo: createAction('LIKE_REPO')
}
```

## Motivation
Redux brought along many great things to the world of software development, unfortunately that came with a bit of extra boilerplate. While the boilerplate is manageable repeating the same code time and time again grows tiresome, especially when it comes to writing constants and action creators.

Take a usual file that exports constants and action creators for both sync and async actions.

```js
export const LOAD_POSTS = '@home/LOAD_POSTS'
export const LOAD_POSTS_REQUEST = {
  START: '@home/LOAD_POSTS_REQUEST_START',
  SUCCESS: '@home/LOAD_POSTS_REQUEST_SUCCESS',
  FAILURE: '@home/LOAD_POSTS_REQUEST_FAILURE'
}

export const constants = {
  LOAD_POSTS,
  LOAD_POSTS_REQUEST
}

export const loadPosts = ({ payload }) => ({ type: LOAD_POSTS, payload })
export const loadPostsRequest = {
  start: ({ payload }) => ({ type: LOAD_POSTS_REQUEST.START, payload }),
  success: ({ payload }) => ({ type: LOAD_POSTS_REQUEST.SUCCESS, payload }),
  failure: ({ payload }) => ({ type: LOAD_POSTS_REQUEST.FAILURE, payload })
}

export default {
  loadPosts,
  loadPostsRequest
}
```

Writing action creators and constants like this quickly becomes very tedious work, and that's where `redux-create-actions` comes in. Refactor the following modules with just
```js
import { buildActions, createAction } from 'redux-create-actions'

const {
  constants,
  actions
} = buildActions('home', {
  loadPosts: createAction('LOAD_POSTS', true)
})
```


## License
[MIT](LICENSE)
