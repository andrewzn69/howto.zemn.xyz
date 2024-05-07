---
description:
public: true
layout: ../../layouts/BlogPost.astro
title: 'How to recurcively remove files with a specific extension in bash'
createdAt: 12/11/2023
updatedAt: 12/11/2023
tags:
- bash
- linux
- cli
heroImage: /posts/bash-logo.png
slug:  bash-recursively-remove-files
---

```bash
#!/bin/bash

find . -type f -name "*.[fileextension]" -exec rm {} \;
```
