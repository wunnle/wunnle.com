---
path: "/monorepos-with-yarn-workspaces"
date: 2020-09-06
title: "Monorepos with Yarn workspaces"
category: "redux"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
---

For a codebase with interdependent projects, a monorepo might be an efficient way of organization, which makes sharing code between projects really easy.

A ***monorepo***  is a single repository containing multiple packages. Imagine a landing page and an admin panel as separate projects with some mutual components. Instead of creating two different repositories for them, we can make these projects live under a single repo, and projects can share code among them.

There are various tools to create and manage monorepos. In this article, I’ll explain how to achieve those using Yarn.

## Yarn workspaces  

[Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) is a feature of Yarn that allows us to have multiple packages (which are called workspaces) that can require modules from one another. All workspaces still get to keep their individual list of dependencies and independent versions, however dependencies of all these projects get installed with a single `yarn install` command from the root.

## Show me the code  

I’ll walk you through how to set up a project using Yarn workspaces with as little code as possible. That means no webpack and babel, so I’ll stick with good ol’ `require` and `module.exports`. I also have [the complete example on GitHub](https://github.com/wunnle/yarn-workspaces-example) if you prefer to skip ahead.

First of all, let’s create a "package.json" file on the root folder of our project with the following code in it:

```js
{
  "private": true,
  "workspaces": [
    "./packages/*"
  ]
}
```
  
Here, you are setting `private` to `true` to prevent the root package to be accidentally published, and this makes sense since workspace root is not a real package. Setting `workspaces` to `["./packages/*"]` tells Yarn to use any folder under `/packages/` as a workspace.

Now let’s create those workspaces.

Create a folder named "packages" and under it, create another one for our first package, **package-a**. `cd` to this folder and run `yarn init` to initialize our package. When prompted, enter "package-a" as the name. Also, create an `index.js` under package-a.

Now do the same thing to create another package under `/packages/`, except this time call it **package-b**. At this point your project structure should like this:

```
package.json    
packages/
  |-- package-a/  
      |-- index.js  
      |-- package.json  
  |-- package-b/  
      |-- index.js  
      |-- package.json  
```

Next, add the following code to `package-a/index.js`:

```js
// package-a/index.js
const dayjs = require('dayjs')

function getDateNameOfToday() {
  return dayjs().format('dddd')
}

module.exports = { getDateNameOfToday }
```

This function returns the current day of the week. To make it work, you'll need `dayjs` dependency. Use the following command to add this dependency to `package-a` workspace:

```bash
yarn workspace package-a add dayjs
```

You can use this `yarn workspace <workspaceName> <command>` syntax to do anything you’d normally do with Yarn; like `add`, `remove`, `build` etc.

Now let's switch to `package-b`. What you want to do here is, to import `getDateNameOfToday()` as a module to use it in `package-b` code. To do that, start by editing `package.json` of `package-b` like this:

```json
{
  "name": "package-b",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "package-a": "1.0.0"
  }
}
```

Having `package-a` as a dependency will let us import modules from it. To install dependencies, just run `yarn` from the root folder. 

Now you can import that function in `package-b`:

```js
const { getDateNameOfToday } = require('package-a');

console.log(`today is ${getDateNameOfToday()}!`);
```

If you run `package-b/index.js` using node, you’ll see the proper output even if `package-b` doesn't explicitly have `dayjs` dependency.

```bash
$ node packages/package-b/index.js
today is Saturday!
```


## Bonus tip: Shared devDependencies

`devDependencies` that are not specific to any project, like eslint and prettier, can be installed to the root package and will be automatically inherited by all workspaces. Here is my root package.json for this example.

```js
{
  "private": true,
  "workspaces": [
    "./packages/*"
  ],
  "devDependencies": {
    "eslint": "^7.7.0",
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-prettier": "^3.1.4",
    "prettier": "^2.0.5"
  }
}
```

