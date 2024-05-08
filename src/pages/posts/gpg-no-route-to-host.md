---
description:
layout: ../../layouts/BlogPost.astro
title: 'How to fix gpg: keyserver receive failed: No route to host'
createdAt: 13/12/2023
updatedAt: 13/12/2023
tags:
- gpg
- linux
- cli
heroImage: /posts/
slug: gpg-no-route-to-host
---

1. Open `~.gnupg/gpg.conf` and add the following line:

```bash
keyserver hkp://keyserver.ubuntu.com:80
```

2. If the above step doesn't work, check (and change) your DNS:

```bash
cat /etc/resolv.conf
```
