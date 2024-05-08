---
description:
layout: ../../layouts/BlogPost.astro
title: How to scan for open port with nmap
createdAt: 06/12/2024
updatedAt: 06/12/2024
tags:
- nmap
- cli
heroImage: /posts/
slug: nmap-scan-for-open-port
---

1. Install nmap

```bash
# Debian/Ubuntu
sudo apt-get install nmap

# Arch
sudo pacman -S nmap

# RHEL/CentOS/Fedora
sudo dnf install nmap
```

2. Scan for open port

```bash
nmap -p <port> -sC <ip>
```
