---
layout: post
title:  "Stripe Implementation"
date:   2017-11-19 21:55:18 -0800
category: features
---

The last implementation simply allowed users to add/remove items to their cart, but
this implementation now actually allows for users to pay for their orders! Well
actually, they were always able to pay for their orders -- except now you can easily
do so with a web interface, instead of using curl in the command line ;)

Up until now the features implemented have been major in terms of website functionality.
The last major feature to be added is the ability as an admin to add items and update
customer orders with newly retrieved shipping information. After that it's simply
making the site prettier :)

Speaking of pretty, something very UGLY is the current stripe checkout. Upon successful
payment, the default behavior of the stripe checkout.js is to open the link you're
sending the form payment parameters to. So currently, the form is ALWAYS going to open
another window with the json details of your order directly from the API. I'm positive
I can work around this via javascript, but for now the best I can do is simply have the
window open in a new tab. Not very pretty, but I'd rather have the main features all
in place before worrying about how ugly it is (hence the current design :P)

TODO:
<ul>
  <li>Admin interface</li>
  <li>Sandbox mode(just for showing off the main features easily)</li>
  <li>Debug page</li>
  <li>Customize stripe payment window</li>
</ul>

Visitor page is now beyond a tertiary feature, it seems more like an unnecessary feature
that will never get used.

Something that I am seriously considering though, is Visitor checkout.
I'm sure some users will not want to go through the effort of making a free account just to
purchase an article of clothing, so I'd like for the no-sign-in checkout to be implemented
sometime.
