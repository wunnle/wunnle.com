---
path: "/css-only-toggle"
date: 2019-03-14
title: "CSS-only toggle"
category: "javascript"
featuredImg: "./switch-1.jpg"
socialImg: "./switch-social.jpg"
---

Here is what we are going to create:

https://codepen.io/wunnle/pen/PeoEXX

Instead of creating a toggle switch from scratch, basically *reskinning* a checkbox is:

A – Obviously easier to develop, because you don’t have re-invent on and off states, the keyboard shortcuts etc  
B – Accessible. So users with screen readers or who can’t use a mouse can still interact with your component.

Ok, lets get to it:

```html
<label for="checkbox">
  <input type="checkbox" class="toggle-checkbox" id="checkbox">  
  <div class="toggle">
    <div class="toggle-pill"></div>
  </div>
</label>
```

For HTML part, we are creating a regular checkbox, then creating our toggle with a pill inside.

On (S)CSS side, I’m just going to style the toggle and the pill. Nothing interesting here. Adding a transition to pill because we’ll change the margin of it when toggle switch states.

```scss
.toggle-checkbox + .toggle {
    display: block;
    width: 30px;
    height: 16px;
    background: #B7BABF;
    border-radius: 26px;
    opacity: 1;
    padding: 2px;
    box-sizing: border-box;
    margin: auto;
    display: flex;
    transition: background 0.5s ease;
  
  .toggle-pill {
      display: block;
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 10px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
      margin-left: 0;
      transition: margin 0.08s cubic-bezier(0.77, 0.49, 1, 1);
  }
}
```

Alright, this is where magic happens:

```scss
.toggle-checkbox:checked + .toggle {
  background: #4079F5;
  transition: background 0.5s ease;
  
  .toggle-pill {
      margin-left: calc(100% - 12px);
  }
}

.toggle-checkbox:focus + .toggle {
    background: #7da6ff;
}
```

By using [:checked selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) and [adjacent sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator) we are changing the background-color of our toggle and margin of the pill. I’m additional changing the background to a different color on focus so it can help users using the keyboard.

Final thing to do is hiding the actual checkbox. The trick over here is making is invisible but still keeping it accessible.

```scss
.toggle-checkbox {
  // visually hidden but accessible
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px
}
```