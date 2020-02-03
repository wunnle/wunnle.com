---
path: "/edit-css-variables-with-js"
date: 2020-02-04
title: "Edit CSS variables with JS"
category: "javascript"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
---


[CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) are pretty cool. You probably know you can create one like this:

```css

:root {
  --donny-brand-color: purple;
}

```

and then use it somewhere else like this:

```css

.donatellosMask {
  background: var(--donny-brand-color)
}

```
<br>
But did you also know that you can modify or create CSS variables from JS side? Here is an example.


```js

document.documentElement.style.setProperty('--donny-brand-color', 'red')

```