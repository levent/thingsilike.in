---
layout: post
pretitle: "Jekyll with Grunt on" # EDITME
subtitle: "GitHub Pages" # EDITME
date: 2015-03-19 12:51:09
categories: # EDITME
---

I've been using Jekyll on GitHub pages for several years as do many others.

We used it at [LogMeIn](https://secure.logmein.com) for [Xively's static site](https://xively.com). I use it for my [personal site](http://www.leventali.com), for clients and for this blog.

It's great for quickly building static sites and not just blogs.

There are a few disadvantages to using the default mechanism with GitHub pages.

It's great to get something up fast. You push to a gh-pages branch and it magically compiles and renders your site.

Unfortunately, you don't have access to many of the Jekyll plugins available so things like concatinating and minifying stylesheets and javascript files aren't readily available.

One option is to compile assets locally and push a built version to the gh-pages branch and keep the basic code on the master branch.

This is where the Javascript community have come up with a bunch of tools to make this workflow much easier.

