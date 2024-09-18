---
description:
public: true
layout: ../../layouts/BlogPost.astro
title: 'How to recurcively remove files with a specific extension in bash'
createdAt: 11/12/2023
updatedAt: 11/12/2023
tags:
- bash
- linux
- cli
heroImage: /posts/
slug:  bash-recursively-remove-files
---

```bash
#!/bin/bash

find . -type f -name "*.[fileextension]" -exec rm {} \;
```
