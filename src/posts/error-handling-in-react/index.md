---
path: "/error-handling-in-react"
date: 2020-02-21
title: "Error handling in React"
category: "react"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
---

Normally you'd catch an error in javascript using a `try/catch` block.

```js
try {
  thisFunctionDoesNotExist()
} catch(error) {
  console.log('oops!', error)
}
```

The statement in the `catch` block will be executed *only* if an exception is thrown in the `try` block.

If you need something similar for React components, there is a lesser-known feature called **Error Boundaries**. Using error boundaries, when something went wrong, you can show the user a fallback screen and log the error.

An error boundary is a component that catches an error thrown anywhere in the child component tree.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo) // log the error here
  }

  render() {
    if (this.state.hasError) {
      return <p>💩</p> // show fallback UI instead of children
    }

    return this.props.children
  }
}
```

It's a good idea to have an error boundary wrapping your top-level components. You can read more about [error boundaries in React docs](https://reactjs.org/docs/error-boundaries.html).

By the way, there is no hook equivalent of error boundaries yet, so you have to create a class component to use this feature for now.
