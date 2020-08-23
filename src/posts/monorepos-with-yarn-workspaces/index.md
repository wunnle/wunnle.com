---
path: "/monorepos-with-yarn-workspaces"
date: 2020-07-06
title: "Monorepos with Yarn workspaces"
category: "redux"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
---


For a codebase with interdependent projects, a monorepo may be an efficient way of organization which makes sharing code between the projects really easy.

A ***monorepo***, or a monolithic repo, is a single repository containing multiple packages that can that can depend one another. For example, imagine a landing page and an admin panel as separate projects with some common components. Instead of having those two as independent repositories, we can make these projects live under a single repo, and projects can share code among each other.  

There are different ways to organize a codebase as a monorepo. In this article I'll explain how to achieve this using yarn.  

## Yarn workspaces  

[Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) is a feature of Yarn that allows us to have multiple packages (or workspaces) that can require dependencieseach other. All workspaces still have their own individual list of dependencies, however all dependencies gets installed with a single 'yarn install' command from the root. 

## Show me the code  

I'll walk you through how to set up a project using Yarn workspaces with the least code as possible. That means no webpack and babel, so I'll stick with good ol' 'require' and 'module.exports'.   

// TODO:  Add something about repo here  

First of all, let's create a package.json file on the root folder of our project.  

```js
{
  "private": true,
  "workspaces": [
    "./packages/*"
  ]
}
```
  
  
Here, `private: true` is there to prevent the root package to be published accidentally, this makes sense since workspace root is not a *real* package. By setting the value of workspaces `["./packages/*"]` we are telling yarn that any folder under `/packages/` will be a workspace.   

Now let's create them.