---
path: "/dynamic-text-color-based-on-background"
date: 2020-03-23
title: "Dynamic text color based on background"
category: "javascript"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
---

**TL;DR**: If you want to set your text color to white or black dynamically, according to the background color contrast with vanilla javascript, you can use this snippet:

```js
function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return [r, g, b]
}

function getTextColor(backgroundHex) {
  const [r, g, b] = hexToRGB(backgroundHex)
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white'
}
```

