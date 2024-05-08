---
description:
layout: ../../layouts/BlogPost.astro
title: How to fix Establishing connection to PulseAudio. Please wait...
createdAt: 25/04/2024
updatedAt: 25/04/2024
tags:
- pulseaudio
- linux
- pipewire
heroImage: /posts/
slug: pulseaudio-establishing-connection
---

1. If you are using pipewire:

```bash
systemctl --user --now restart pipewire-pulse
```
