---
description:
layout: ../../layouts/BlogPost.astro
title: How to scan for viruses on Linux
createdAt: 12/12/2023
updatedAt: 12/12/2023
tags:
- linux
- cli
- security
heroImage: /posts/
slug: linux-scan-for-viruses
---

1. Install `clamav`

```bash
# Debian/Ubuntu
sudo apt install clamav

# Arch
sudo pacman -S clamav

# RHEL/CentOS/Fedora
sudo dnf install clamav
```

2. Update the virus definitions

```bash
sudo freshclam
```

3. Scan

```bash
# a file
clamscan <file>

# a directory
clamscan -r <directory>
```
