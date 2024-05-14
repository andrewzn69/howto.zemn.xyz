---
description:
public: true
layout: ../../layouts/BlogPost.astro
title: How to migrate to bun from yarn or npm
createdAt: 14/05/2024
updatedAt: 14/05/2024
tags:
- npm
- yarn
- bun
- frontend
heroImage: /posts/
slug: react-migrate-to-bun
---

1. install bun globally

```bash
# with install script
curl -fsSL https://bun.sh/install | bash

# with npm
npm install -g bun

# with Homebrew
brew tap oven-sh/bun
brew install bun

# with Docker
docker pull oven/bun
docker run --rm --init --ulimit memlock=-1:-1 oven/bun

# on windows
powershell -c "irm bun.sh/install.ps1 | iex"
```

2. migrate your project

```bash
cd <your-project>
bun install
```

3. remove yarn.lock or package-lock.json

```bash
rm yarn.lock
rm package-lock.json
```
