---
description: 
layout: ../../layouts/BlogPost.astro
title: How to remove namespace stuck in Terminating state in Kubernetes
createdAt: 16/04/2023
updatedAt: 16/04/2023
tags:
- kubernetes
- k3s
- k8s
- cli
heroImage: /posts/
slug: kubernetes-remove-terminating-namespace
---

Having trouble deleting a Kubnernetes namespace? It might be stuck in a `Terminating` state. Here's how to identify and fix the issue.

```bash
$ kubectl delete namespace test-namepspace
namespace "test-namepspace" deleted

$ kubectl get namespace
NAME                    STATUS          AGE
default                 Active          69d
ingress-nginx           Active          69d
kube-node-lease         Active          69d
kube-public             Active          69d
kube-system             Active          69d
kubernetes-dashboard    Active          69d
test-namespace          Terminating     2d
```

1. Dump the contents of the namespace to a temporary file:

```bash
kubectl get namespace test-namespace -o json > tmp.json
```

2. Edit the temporary file in your favourite editor

```bash
vim tmp.json
```

3. Remove `"kubernetes"` from the finalizer array and save the file

```diff
{
    "apiVersion": "v1",
    "kind": "Namespace",
    "metadata": {
        "creationTimestamp": "2023-04-16T12:00:00Z",
        "deletionTimestamp": "2023-04-16T12:00:00Z",
        "name": "test-namespace",
        "resourceVersion": "123456",
        "selfLink": "/api/v1/namespaces/test-namespace",
        "uid": "123456"
    },
    "spec": {
        "finalizers": [
-           "kubernetes"
        ]
    },
    "status": {
        "phase": "Terminating"
    }
}
```

4. Start the proxy (if you haven't already)

```bash
kubectl proxy
```

5. Call the Kubernetes API application/json against the /finalize endpoint for the namespace to update the JSON. Use the port number appropriate for your instance.

```bash
curl -k -H "Content-Type: application/json" -X PUT --data-binary @tmp.json http://localhost:8001/api/v1/namespaces/test-namespace/finalize
```

6. Check the namespace status

```bash
$ kubectl get namespace test-namespace
Error from server (NotFound): namespaces "test-namespace" not found
```
