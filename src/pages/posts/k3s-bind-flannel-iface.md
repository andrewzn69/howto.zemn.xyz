---
description:
layout: ../../layouts/BlogPost.astro
title: How to bind flannel to different iface
createdAt: 28/11/2023
updatedAt: 28/11/2023
tags:
- k3s
- kubernetes
- cli
heroImage: /posts/
slug: k3s-bind-flannel-iface
---

This is a short post on how to install k3s cluster with flannel binded to a different interface. This is useful when you have multiple network interfaces and you want to bind flannel to a specific one.

### Master node install

1. Change to root user

```bash
sudo -i
```

2. Declare variables (it's more readable than using the command directly)

```bash
export K3S_NODE_NAME=[node-name]
export K3S_EXTERNAL_IP=[node-ip]

# change kubeconfig permission
export K3S_KUBECONFIG_MODE=644

# install and specify desired interface
curl -sfL https://get.k3s.io | sh -s - --flannel-iface=[interface-name]

# check status
systemctl status k3s

# print kubernetes token
cat /var/lib/rancher/k3s/server/node-token
```

3. Copy the token for the worker nodes

4. Copy the kubeconfig

```bash
less /etc/rancher/k3s/k3s.yaml
```

5. Exit root user

```bash
exit
```

6. Create a folder called `.kube` in your home directory and create a file called `kubeconfig` inside it

```bash
mkdir -p $HOME/.kube

touch $HOME/.kube/kubeconfig
```

7. Edit the file and paste the kubeconfig content

8. Edit this line and enter correct ip address:

```yaml
server: https://[master-ip]:6443
```

### Worker node Install

1. Change to root user

```bash
sudo -i
```

2. Declare variables (it's more readable than using the command directly)

```bash
export K3S_NODE_NAME=[node-name]
# change kubeconfig permission
export K3S_KUBECONFIG_MODE="644"
export K3S_EXTERNAL_IP=[node-ip]

export K3S_URL="https://[ip-of-master-node]:6443"
export K3S_TOKEN=[copied-token]

# install and specify desired interface
curl -sfL https://get.k3s.io | sh -s - --flannel-iface=[interface-name]

# check status
systemctl status k3s-agent
```

`--flannel-iface=[interface-name]` is the flag that binds flannel to the specified interface.
