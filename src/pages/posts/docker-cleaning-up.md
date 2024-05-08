---
description:
public: true
layout: ../../layouts/BlogPost.astro
title: How to clear Docker cache and free up space on your system
createdAt: 07/05/2024
updatedAt: 07/05/2024
tags:
- docker
- linux
heroImage: /posts/
slug: docker-cleaning-up
---

How much disk space is Docker using?

```bash
docker system df

TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          7         1         47.97GB   47.08GB (98%)
Containers      1         1         33.13kB   0B (0%)
Local Volumes   2         0         179.1MB   179.1MB (100%)
Build Cache     64        0         10.18GB   10.18GB
```

Removing unused containers

```bash
docker container prune -f

Total reclaimed space: 0B
```

Removing unused images

```bash
docker image prune -af

Deleted Images:
deleted: sha256:b4426c00e4367ca891edeaf22c7aa2e7ee161b7eef4e0a2a58ca1267e9aad892
...output omitted...

Total reclaimed space: 47.08GB
```

Removing unused volumes

1. List all volumes

```bash
docker volume ls

DRIVER    VOLUME NAME
local     5266d055c8fa36f2d52822e7ea06967a5462fe70e18f8380cde3b512663eb31a
local     a7a6e565195de474da663d983f69d3f22b6c13e23fb1bd516334f7c538aa27db
...output omitted...
```

Removing the volumes

```bash
docker volume prune -af

Deleted Volumes:
5266d055c8fa36f2d52822e7ea06967a5462fe70e18f8380cde3b512663eb31a
a7a6e565195de474da663d983f69d3f22b6c13e23fb1bd516334f7c538aa27db

Total reclaimed space: 179.1MB
```

Removing build cache

```bash
docker builder prune -af

Deleted build cache objects:
k2nrja7w40grpbk0dyk6xw4im
7eaxpphvnk7vtchrg9tkd5iwd
...output omitted...

Total reclaimed space: 5.777GB
```

Removing networks

```bash
docker network prune -f

Deleted Networks:
network-1
```
