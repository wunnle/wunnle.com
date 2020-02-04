---
path: "/edit-css-variables-with-js"
date: 2020-02-04
title: "Edit CSS variables with JS"
category: "javascript"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
---


[CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) are pretty cool. You probably know you can define one like this:

```css

:root {
  --donny-brand-color: purple;
}

```

and then use it somewhere else later:

```css

.donatellosMask {
  background: var(--donny-brand-color)
}

```
But did you also know that you can modify or create CSS variables from JS side? Here is how you would do it:


```js

document.documentElement.style.setProperty('--donny-brand-color', 'red')

```

<br>

This is especially useful when you need to tie some style properties to event listeners, like setting the position of an element to current cursor position. See this example on codepen which brings everything together:

https://codepen.io/wunnle/pen/vYOBOPE?editors=0110