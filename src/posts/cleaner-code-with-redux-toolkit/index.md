---
path: "/cleaner-code-with-redux-toolkit"
date: 2020-07-06
title: "Modern Redux with Redux Toolkit"
category: "redux"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
---

**Redux Toolkit** (RTK for short) is the [recommended toolset by Redux Team](https://redux.js.org/style-guide/style-guide#use-redux-toolkit-for-writing-redux-logic) for writing Redux code. RTK provides simple utility functions to write cleaner, easier and reusable code. Out of the box, RTK comes with useful Redux packages like Redux Thunk and Immer.

**In this article, I'll walk you through how to implement Redux Toolkit on a React app that *already* uses Redux.** I'll use an app called *ColorsApp*, it's a small project I created during a live  stream earlier[^1]. This article assumes you have an understanding of both React and Redux.

In case you prefer to read the code on your editor, you can clone [pre-redux-toolkit](https://github.com/wunnle/colorsApp/tree/pre-redux-toolkit) and [redux-toolkit-implementation](https://github.com/wunnle/colorsApp/tree/feature/redux-toolkit-implementation) branches from GitHub and compare the code.

Let's get to it.

## Installation

For existing apps, you can install Redux Toolkit by running this command:

```bash
yarn add @reduxjs/toolkit

## OR

npm install @reduxjs/toolkit
```

For new apps, RTK recommends using [their official template](https://github.com/reduxjs/cra-template-redux).


## configureStore()

My original code to create the Redux store looks like this:

```js
// old store.js

import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const middlewareEnhancer = applyMiddleware(thunk)
const composedEnhancers = composeWithDevTools(middlewareEnhancer)

const store = createStore(rootReducer, undefined, composedEnhancers)

export default store
```

 I'm using Redux Devtools Extension and Redux Thunk middleware with my store.

RTK provides a function called `configureStore` to create a Redux store. Let's create the store the RTK way:

```js
// new store.js

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({ reducer: rootReducer })

export default store
```

Much cleaner, huh? `configureStore` has both **Redux Thunk** and **Redux Devtools Extension** by default, so there is no need to implement them.


## Meet slices 🍕

Let's look at the login action and reducer.

```js
// actions/login.js

export function userLoggedIn(userEmail) {
  return {
    type: 'USER_LOGGED_IN',
    payload: {
      userEmail
    }
  }
}
```

```js
// reducers/login.js

const defaultState = {
  isUserLoggedIn: false,
  userEmail: null
}

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        ...state,
        userEmail: action.payload.userEmail,
        isUserLoggedIn: true
      }

    default:
      return state
  }
}

export default loginReducer
```

While using Redux, we ***slice*** the application state to small chunks and create a reducer for each slice, then merge all reducers with `combineReducers`. RTK's `loginSlice` function makes the creation of a slice a lot easier:

```js
// Login/loginSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isUserLoggedIn: false,
  userEmail: null
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => ({
      ...state,
      userEmail: action.payload.userEmail,
      isUserLoggedIn: true
    })
  }
})

export default loginSlice
```

`createSlice()` accepts a single object with `name`, `initialState` and `reducers` keys. `reducers` here is the equivalent of the switch statement we would use on a traditional reducer. It's an object with action types as keys (more on this later) and reducer logic as values.

To pass a slice to combineReducers, we use its `reducer` property.

```js
import loginSlice from 'Login/loginSlice'

export default combineReducers({
  login: loginSlice.reducer,
  // more reducers...
})
```

As you probably noticed, `loginSlice` lives inside the /Login directory, where the relevant component is. Structuring files by feature and placing all relevant files under a feature folder is [recommended by Redux Team](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-or-ducks). 

But wait, where do we define action creators with this approach? 🤔

**We don't.** `createSlice` automatically generates the actions for you. So when you dispatch the `userLoggedIn` action from above you just write:

```js
import loginSlice from './loginSlice'

dispatch(loginSlice.actions.userLoggedIn(email))
```

...and `email` passed to `userLoggedIn` can be accessed with `action.payload` in the reducer. How cool is that? Action types are generated using the slice name and the key in the reducers object. So for this example, you'll see `login/userLoggedIn` in your Dev Tools[^2]. 


## Mutating the state

RTK uses a package called [Immer](https://github.com/immerjs/immer) which allows you to write mutations and still have an immutable state! So as an alternative to returning copy of the state, we can also do this:

```js

const loginSlice = createSlice({
  ///...
  reducers: {
    userLoggedIn: (state, action) => {
      state.userEmail = action.payload
      state.isUserLoggedIn = true
    }
  }
})
```

## What about thunks?

Here is an async action I have on the ColorsApp:

```js
// actions/colors.js

export function getColors() {
  return async (dispatch) => {
    dispatch({
      type: 'GET_COLORS_STARTED'
    })

    try {
      const res = await fetch('https://reqres.in/api/colors')
      const { data } = await res.json()

      dispatch({
        type: 'GET_COLORS_SUCCESS',
        payload: data
      })
    } catch (error) {
      dispatch({
        type: 'GET_COLORS_FAILED',
        payload: error
      })
    }
  }
}
```

RTK's solution for async actions is `createAsyncThunk()` and it looks like this:

```js
// colorsListSlice.js

export const fetchColorList = createAsyncThunk('colorList/fetchColorList', async () => {
  const res = await fetch('https://reqres.in/api/colors')
  const { data } = await res.json()

  return data
})
```

The cool thing about `createAsyncThunk()` is, it has "started", "success" and "failed" action creators built-in. So when you dispatch `fetchColorList` action:

* It'll dispatch `colorList/fetchColorList/pending`
* Then if the promise resolves, it'll dispatch `colorList/fetchColorList/fulfilled`
* If promise is rejected, instead it'll dispatch  `colorList/fetchColorList/rejected`


Even if it uses a different naming convention for action types, the options are the same as my original code.

We'll handle these actions in our **slice** like this:

```js
// colorsListSlice.js

const colorListSlice = createSlice({
  name: 'colorList',
  initialState,
  extraReducers: {
    [fetchColorList.pending]: (state) => {
      state.error = null
      state.isLoading = true
      state.colors = []
    },
    [fetchColorList.fulfilled]: (state, action) => {
      state.error = null
      state.isLoading = false
      state.colors = action.payload
    },
    [fetchColorList.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})
```

Notice this time we used `extraReducers` instead of `reducers`. `extraReducers` is for the actions not generated by our slice. We can still modify our state thanks to Immer. 

All done! As you can see by using **Redux Toolkit**, not only did we get rid of lots of boilerplate, but also we got automatically generated action types with better naming, got a better file structure and we don't need to worry about mutating the state in reducers anymore.

Happy coding! 🍕

[^1]: The livestream was about creating a React app using Redux and React Router. You can find it [here](https://www.youtube.com/watch?v=CZm0mQx4pBw). It's in Turkish though.

[^2]: Using 'domain/eventName' format for action types is [another recommendation by Redux](https://redux.js.org/style-guide/style-guide#write-action-types-as-domaineventname).