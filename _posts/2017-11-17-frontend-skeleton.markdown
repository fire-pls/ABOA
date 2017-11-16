---
layout: post
title:  "Major front-end features in place"
date:   2017-11-17 00:03:30 -0800
category: front
---

Very excited to release the skeleton for the frontend today. All the major
features such as displaying items, dynamic link creation for proper sharing,
and the vital cart management are all in place!

Many unexpected problems arose during this past week. I originally thought it'd
take half a week at most to finish up until this far, but alas I am but one programmer.
Coupled with my budding skillset, problems I wasn't even aware of popped up one after
antother. Problems such as CORS compliance and my browser blocking mixed active content
from non-secure servers weren't so terrible to fix, but their combined setbacks took
a substantial amount of time away. From constantly switching between the master & gh-pages
branch to push a new version to heroku, to looking up better ES6 methods for refactoring,
I can immediately tell where my workflow can be expedited.

One of the biggest timesinks was the constant need to push to gh-pages to test if
my code worked. the annoying thing about jekyll and rails is they cannot run local
servers at the same time, despite using different ports. So my only choice was to
either run a local rails api to test on the live site, or run a jekyll site to
test the live api. In retrospect I'd probably have been better off running the latter,
but I lose the nice error messages that come with the development server.

What I ended up doing was the former for the first half of the website development,
and then ultimately ditching local servers altogether and tested on both the live
gh-pages and the heroku api. I don't think it would've been possible to waste even more time if I tried...

But ultimately, I'm happy of the progress so far. My code isn't the prettiest,
but hey that's why there's always v2 ;) I really want to look into TDD for my
next projects.

TODO:
<ul>
  <li>Stripe checkout page</li>
  <li>Admin addition of items</li>
  <li>Sandbox mode to quickly showcase features</li>
  <li>Debug page for easily adding items</li>
  <li>Visitor page</li>
  <li>Visitor page</li>
</ul>
I also still need a readme, but it's pretty low priority at the moment. If this
gains unexpected traction out of nowhere I'll introduce one.
