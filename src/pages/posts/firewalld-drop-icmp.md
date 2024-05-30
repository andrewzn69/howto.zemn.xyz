---
description:
layout: ../../layouts/BlogPost.astro
title: How to drop ICMP packets with firewalld
createdAt: 30/05/2024
updatedAt: 30/05/2024
tags:
- firewalld
- linux
- cli
heroImage: /posts/
slug: firewalld-drop-icmp
---
1. Drop all ICMP

```bash
firewall-cmd --set-target=DROP --zone=public --permanent
firewall-cmd --zone=public --remove-icmp-block={echo-request,echo-reply,timestamp-request,timestamp-reply} --permanent
```

2. Reload the firewall

```bash
firewall-cmd --reload
```

References:

- <https://unix.stackexchange.com/a/585031>
