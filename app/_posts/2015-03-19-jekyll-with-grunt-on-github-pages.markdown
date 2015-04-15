---
layout: post
pretitle: "Jekyll with Grunt on" # EDITME
subtitle: "GitHub Pages" # EDITME
date: 2015-03-19 12:51:09
categories: # EDITME
---

I've been using Jekyll on GitHub pages for several years.

[LogMeIn](https://secure.logmein.com) use it for [Xively's static site](https://xively.com). I use it for my [personal site](http://www.leventali.com), with clients and for this blog.

It's a great framework for building static sites as well as blogs.

You push your changes to a gh-pages branch, it magically compiles and your site renders, for free.

### Grunt

Unfortunately, you don't have access to many of the [Jekyll plugins available](https://help.github.com/articles/using-jekyll-plugins-with-github-pages/), so things like concatenating, minifying and uglifying stylesheets and javascript files aren't readily available.

Jekyll will compile your sass and generate a sitemap but doing much beyond that means you need to generate your site before pushing the files to GitHub.

This is where the Javascript community have come up with a great set of tools to make this workflow much easier.

There are a lot of useful plugins for [Grunt](http://gruntjs.com/) that will do all the hard work for you. Whether it's the autoprefixer for vendor prefixing css, making your images smaller or linting your javascript.

### Yeoman

Using one of [Yeoman](http://yeoman.io/)'s generators mean you can have an entire app scaffolding setup with everything configured. This can save hours of effort but I advise against this until you understand how Grunt plugins work.

The [Gruntfile.js](https://github.com/levent/thingsilike.in/blob/master/Gruntfile.js) for this started small and I added plugins one by one until it did pretty much everything I saw in [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb).
