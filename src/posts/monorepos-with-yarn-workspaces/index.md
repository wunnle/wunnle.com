---
path: "/monorepos-with-yarn-workspaces"
date: 2020-08-30
title: "Monorepos with Yarn workspaces"
category: "redux"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
---


For a codebase with interdependent projects, a monorepo might be an efficient way to organization which makes sharing code between the projects really easy.

A ***monorepo*** is a single repository containing multiple packages. For example, imagine a landing page and an admin panel as separate projects with some common components. Instead of having those two as independent repositories, we can make these projects live under a single repo, and projects can share code among them.  

There are different tools to create and manage monorepos. In this article I'll explain how to achieve this using yarn.

## Yarn workspaces  

[Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) is a feature of Yarn that allows us to have multiple packages (or workspaces) that can require modules from one another. All workspaces still have their own individual list of dependencies and independent versions, however all dependencies of all these projects get installed with a single `yarn install` command from the root. 

## Show me the code  

I'll walk you through how to set up a project using Yarn workspaces with the least code as possible. That means no webpack and babel, so I'll stick with good ol' `require` and `module.exports`. I have the [complete example on GitHub](https://github.com/wunnle/yarn-workspaces-example), if you want to skip ahead.

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

Now let's create them.

Create a folder names "packages" and under it create another folder for our first package, **package-a**. `cd` to this folder and run `yarn init` to initialize our package. When prompted, enter "package-a" to the name. Also create an `index.js` under package-a.

Now follow the same steps to create another package under /packages/, but this time call it **package-b**. At this point your project should have a structure like this:

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
