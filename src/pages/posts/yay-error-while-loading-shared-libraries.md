---
description:
public: true
layout: ../../layouts/BlogPost.astro
title: 'How to fix yay: error while loading shared libraries: libalpm.so'
createdAt: 07/05/2024
updatedAt: 07/05/2024
tags:
- arch linux
- linux
- cli
heroImage: /posts/
slug: yay-error-while-loading-shared-libraries
---

```yay: error while loading shared libraries: libalpm.so.13: cannot open shared object file: No such file or directory```

This error can only be fixed by reinstalling yay. There is no other way to solve this error.

1. Remove `yay`:

```
pacman -R yay
```

2. Make a new directory and clone the `yay` repository

```
git clone https://aur.archlinux.org/yay.git && cd yay
```

3. Build and install `yay`:

```
makepkg -si
```

After installation, you can use `yay` as usual.
