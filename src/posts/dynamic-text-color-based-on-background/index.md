---
path: "/dynamic-text-color-based-on-background"
date: 2020-03-23
title: "Dynamic text color based on background"
category: "javascript"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
---

**TL;DR**: If you want to set your text color to white or black dynamically according to the background color contrast using javascript, you can use the following code:

```js
function getRGB(c) {
  return parseInt(c, 16) || c
}

function getsRGB(c) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}

function getLuminance(hexColor) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  )
}

function getContrast(f, b) {
  const L1 = getLuminance(f)
  const L2 = getLuminance(b)
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

function getTextColor(bgColor) {
  const whiteContrast = getContrast(bgColor, '#ffffff')
  const blackContrast = getContrast(bgColor, '#000000')

  return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}
```

## Longer explanation

To calculate contrast between two colors - in this case, foreground and background - we'll use the following contrast ratio formula, defined by [WCAG guidelines](https://www.w3.org/WAI/GL/wiki/Contrast_ratio): 

```
(L1 + 0.05) / (L2 + 0.05)
```

Here L1 and L2 are *relative luminance* values of our foreground and background colors. [Relative luminance](https://en.wikipedia.org/wiki/Relative_luminance) measure of how bright a color is perceived to human eye[^1] and it has a formula of:

```
Y = 0.2126R + 0.7152G + 0.0722B
```


Where R, G, B are sRGB components of a color. So to get sRGB components of a hex color we need some helper functions.

```js
function getRGB(c) {
  return parseInt(c, 16) || c
}

function getsRGB(c) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}

function getLuminance(hexColor) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  )
}
```

Using relative luminance of each color, we can get the contrast between them:

```js
function getContrast(f, b) {
  const L1 = getLuminance(f)
  const L2 = getLuminance(b)
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}
```

Finally, we can calculate two sets of contrast - between our color and black or white - to determine which combination is more visible.

```js
function getTextColor(bgColor) {
  const whiteContrast = getContrast(bgColor, '#ffffff')
  const blackContrast = getContrast(bgColor, '#000000')

  return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}
```

This method is used by [Chrome DevTools](https://developers.google.com/web/updates/2018/01/devtools#contrast) and [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/).

Here is a pen showing this in action:


https://codepen.io/wunnle/pen/vYOVbqm?editors=0010



[^1]: To our eyes, green color seem brightest and blue seem the least bright.
