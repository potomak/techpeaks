---
layout: post
title: Generative peaks
description: Having fun with generative art.
---

I love to build *useless* things, it's relaxing.

I always wanted to experiment with computer art so I took inspiration from [Creative Applications](http://www.creativeapplications.net/)'s logo to build an algorithm that generates random peaks. You can see them at the bottom of this page, I think they're perfect for this blog about Teck*Peaks*, don't you think?

The script puts a background canvas for every page of the blog. The algorithm generates two layers of peaks, each composed by the triangulation of random points. Triangles are filled with two sets of colors and rendered using a `canvas` element.

If you want you can take a look at the code at [http://github.com/potomak/techpeaks](http://github.com/potomak/techpeaks).