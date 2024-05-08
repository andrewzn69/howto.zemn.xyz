---
description:
layout: ../../layouts/BlogPost.astro
title: How to run programs that require X11 on Wayland
createdAt: 22/04/2024
updatedAt: 22/04/2024
tags:
- x11
- wayland
- linux
- cli
heroImage: /posts/
slug: wayland-how-to-run-x11-programs
---

1. Run the program with `GDK_BACKEND=x11`:

```bash
GDK_BACKEND=x11 <program>
```
