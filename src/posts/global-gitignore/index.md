---
path: "/global-gitignore"
date: 2020-12-24
title: "Global .gitignore"
category: "git"
featuredImg: "./post.jpg"
socialImg: "./social.jpg"
tweet: "https://twitter.com/wunnle/status/1341702262180212738"
---

Instead of adding platform-specific files like `.DS_Store` to `.gitignore` file of every single project, you can just create a global `.gitignore` file.

To do that, first create a new `.gitignore` file on the root (or wherever you want):

```bash
touch ~/.gitignore
```

Add the files you don't want to track to it:
```bash
echo .DS_Store >> ~/.gitignore
```

Finally tell introduce your global `.gitignore` file to git:
```bash
git config --global core.excludesfile ~/.gitignore
```