---
description:
public: true
layout: ../../layouts/BlogPost.astro
title: How to convert OVA to QCOW2 using QEMU
createdAt: 02/17/2024
updatedAt: 02/17/2024
tags:
- virtual machines
- virtualbox
- qemu
- cli
heroImage: /posts/
slug: qemu-convert-ova-to-qcow2
---

1. Install `qemu-utils` package.

```bash
# Debian/Ubuntu
sudo apt install qemu-utils

# Arch
sudo pacman -S qemu

# RHEL/CentOS/Fedora
sudo dnf install qemu-img
```

2. Export VirtualBox Appliance to OVA

```bash
$ VBoxManage list vms
"DB_Server" {9bf53784-16e9-40e7-b081-b7a87ff2f039}

$ VBoxManage export [VM_NAME] -o [OUTPUT_FILE].ova --ovf10
```

3. Extract the `.ova` Package

```bash
tar -xvf [OUTPUT_FILE].ova
```

4. Convert the `.vmdk` to `.qcow2`

```bash
qemu-img convert -f vmdk -O qcow2 [VM_NAME-DISK].vmdk [VM_NAME].qcow2
```
