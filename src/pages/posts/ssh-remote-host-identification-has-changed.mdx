---
description:
public: true
layout: ../../layouts/BlogPost.astro
title: How to troubleshoot SSH host identification issues
createdAt: 01/12/2024
updatedAt: 01/12/2024
tags:
- ssh
- security
- cli
heroImage: /posts/
slug: ssh-remote-host-identification-has-changed
---

```bash
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.
Please contact your system administrator.
Add correct host key in /home/user/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /home/user/.ssh/known_hosts:12
ECDSA host key for server1.example.com has changed and you have requested strict checking.
Host key verification failed.
```

If you do not know why the key changed, then verify the new key fingerprint, because this key might be an actual attack on your network.

If you know why the key changed, such as an IP address change, then resolve this problem by removing the relevant key entry from the `~/.ssh/known_hosts` file, and then reconnect to the system to receive the new key entry.

The line number of the relevant key entry is listed in the error message. In the example below, the line number is 12.

```bash
ssh-keygen -R server1.example.com -f ~/.ssh/known_hosts
# Host server1.example.com found: line 12
/home/user/.ssh/known_hosts updated.
Original contents retained as /home/user/.ssh/known_hosts.old
```
