---
description:
layout: ../../layouts/BlogPost.astro
title: 'How to fix qt.qpa.plugin: Could not find the Qt platform plugin "wayland"'
createdAt: 27/04/2024
updatedAt: 27/04/2024
tags:
- qt
- linux
- cli
heroImage: /posts/
slug: qt-could-not-find-platform-plugin
---


```bash
qt.qpa.plugin: Could not find the Qt platform plugin "wayland" in ""
This application failed to start because no Qt platform plugin could be initialized. Reinstalling the application may fix this problem.

Available platform plugins are: xcb.

[1]    3755073 IOT instruction (core dumped)  soulseekqt
```

1. Install the `qt5-wayland` package.

```bash
# debian/ubuntu
sudo apt install qt5-wayland

# arch
sudo pacman -S qt5-wayland
```

2. If it doesn't work, try to run the program with the `QT_QPA_PLATFORM` environment variable set to `xcb`.

```bash
QT_QPA_PLATFORM=xcb [program-name]
```
