---
description:
public: true
layout: ../../layouts/BlogPost.astro
title: How to change Java version on Arch Linux
createdAt: 05/07/2024
updatedAt: 05/07/2024
tags:
- arch linux
- java
- cli
heroImage: /posts/
slug: java-version-arch-linux
---

1. List all installed java versions

```bash
archlinux-java status
```

2. (Optional) Install a new java version

```bash
sudo pacman -S jdk-openjdk[version]
```

3. Set the default java version

```bash
sudo archlinux-java set java-[version]-openjdk
```
