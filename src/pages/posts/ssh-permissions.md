---
description:
public: true
layout: ../../layouts/BlogPost.astro
title: How to correctly set file permissions for SSH keys
createdAt: 12/01/2024
updatedAt: 12/01/2024
tags:
- ssh
- cli
- security
heroImage: /posts/
slug: ssh-permissions
---

```md
| File                    | Permission (octal) | Permission (string) |
|------------------------ | ------------------ | ------------------- |
| .ssh (folder)           | 700                | drwx------          |
| id_rsa (private key)    | 600                | rw------            |
| ir_rsa.pub (public key) | 644                | rw-r-r-             |
```

1. Use the following command to set the file permissions so that only you can read the file:

```bash
chmod 600 <private_key>
chmod 644 <public_key>
```

2. Set the permisison of the .ssh directory to 700:

```bash
chmod 700 ~/.ssh
```

3. connect to the remote server:

```bash
ssh -i <private_key> <user>@<ip_address>
```
