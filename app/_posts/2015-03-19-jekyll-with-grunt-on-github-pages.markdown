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

### Grunt

Unfortunately, you don't have access to many of the Jekyll plugins available so things like concatenating, minifying and uglifying stylesheets and javascript files aren't readily available.

Jekyll will compile your sass and generate a sitemap but doing much beyond that involves writing Rake tasks using plugins locally and generating your site before pushing it to GitHub.

This is where the Javascript community have come up with a great set of tools to make this workflow much easier.

[Grunt](http://gruntjs.com/) has a wealth of useful plugins that will do most of what you could need. Whether it's the autoprefixer for vendor prefixing css, making your images smaller or linting your javascript.

### Yeoman

Initially people recommended I use [Yeoman](http://yeoman.io/) as it takes things one layer further out by providing scaffolds for many of the things you'd want setup. It saves a lot of time and effort but personally I recommend starting out with Grunt and learning how the plugins work one at a time to eliminate a lot of the magic that Yeoman gives you.

My [Gruntfile.js](https://github.com/levent/thingsilike.in/blob/master/Gruntfile.js) began small and built its way up to what you get with [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb)
