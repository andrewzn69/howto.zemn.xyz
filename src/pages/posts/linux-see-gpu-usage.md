---
description:
layout: ../../layouts/BlogPost.astro
title: How to see GPU usage on Linux
createdAt: 15/12/2023
updatedAt: 15/12/2023
tags:
- linux
- cli
heroImage: /posts/
slug: linux-see-gpu-usage
---
1. Install `nvtop`

```bash
# Debian/Ubuntu
sudo apt install nvtop

# Arch
sudo pacman -S nvtop

# RHEL/CentOS/Fedora
sudo dnf install nvtop
```

2. Run `nvtop`

```bash
nvtop
```

Note: You can also use `radeontop` for AMD GPUs but it's not as feature-rich as `nvtop`.
