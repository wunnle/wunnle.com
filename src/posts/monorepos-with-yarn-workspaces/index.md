---
path: "/monorepos-with-yarn-workspaces"
date: 2020-09-06
title: "Monorepos with Yarn workspaces"
category: "redux"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
---

For a codebase with interdependent projects, a monorepo might be an efficient way of organization to make sharing code between the projects really easy.

A ***monorepo*** is a single repository containing multiple packages. Imagine a landing page and an admin panel as separate projects with some common components. Instead of creating two repositories for them, we can make these projects live under a single repo, and projects can share code among them.

There are different tools to create and manage monorepos. In this article, I'll explain how to achieve those using yarn.

## Yarn workspaces  

[Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) is a feature of Yarn that allows us to have multiple packages (which are called workspaces) that can require modules from one another. All workspaces still have their individual list of dependencies and independent versions, , all dependencies of all these projects get installed with a single `yarn install` command from the root. 

## Show me the code  

I'll walk you through how to set up a project using Yarn workspaces with the least code as possible. That means no webpack and babel, so I'll stick with good ol' `require` and `module.exports`. I also have [the complete example on GitHub](https://github.com/wunnle/yarn-workspaces-example) if you prefer to skip ahead.

First of all, let's create a package.json file on the root folder of our project and add the following code:

```js
{
  "private": true,
  "workspaces": [
    "./packages/*"
  ]
}
```
  
Here, we are setting `private` to `true` to prevent the root package to be published accidentally, this makes sense since workspace root is not a *real* package. By setting the value of workspaces `["./packages/*"]` we are telling yarn that any folder under `/packages/` will be a workspace.   

Let's create them.

Create a folder names "packages" and under it create another folder for our first package, **package-a**. `cd` to this folder and run `yarn init` to initialize our package. When prompted, enter "package-a" to the name. Also, create an `index.js` under package-a.

Now do the same thing to create another package under `/packages/`, but this time call it **package-b**. At this point your project should have a structure like this:

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

Now add the following code to `package-a/index.js`:

```js
// package-a/index.js
const dayjs = require('dayjs')

function getDateNameOfToday() {
  return dayjs().format('dddd')
}

module.exports = { getDateNameOfToday }
```

Here we define this function that returns current day of the week and export it. To make this function work, we need `dayjs` dependency. To add this dependency to `package-a` workspace, use the following command:

```bash
yarn workspace package-a add dayjs
```


Now ket's switch to `package-b`. What I want to do here is, import the `getDateNameOfToday()` as a module as use it in `package-b` code. To do that first go to `package.json` under `/package-b` and update it like this:

```js
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

Adding `package-a` as a dependency will let us import modules from it. To install dependencies, run `yarn` from the root folder. 

Now we can import our function in package-b:

```js
const { getDateNameOfToday } = require('package-a');

console.log(`today is ${getDateNameOfToday()}!`);
```

If you run `node packages/package-b/index.js` you'll the function is working even if package-b doesn't have dayjs dependency.



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

