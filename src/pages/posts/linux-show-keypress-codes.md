---
description:
layout: ../../layouts/BlogPost.astro
title: How to see keypress codes in Linux
createdAt: 14/12/2023
updatedAt: 14/12/2023
tags:
- linux
- x11
- wayland
heroImage: /posts/
slug: linux-show-keypress-codes
---

1. X11/Xorg

```bash
xev
```

2. Wayland

```bash
wev
```

Note:
`wev` is more useful on wayland, because you can also see the keycodes
