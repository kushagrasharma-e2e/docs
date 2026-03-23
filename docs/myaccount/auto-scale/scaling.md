---
title: Scaling & Clusters
sidebar_label: Scaling
---

This guide explains how to scale workloads on E2E, from a single node to clusters and auto-scaling groups.

---

## Scaling patterns on E2E

There are three common patterns:

1. **Vertical scaling**  
   Increase CPU/RAM on a single Node.  
   Simple, fast, but has an upper limit and downtime.

2. **Horizontal scaling**  
   Run multiple Nodes behind a load balancer.  
   More moving parts, much more resilient.

3. **Managed clusters (Kubernetes)**  
   For teams that want orchestration, auto-scaling, and rolling deployments.

---

## Pattern 1: Vertical scaling (quick wins)

Use when:

- Traffic is predictable
- You’re early-stage
- Downtime for resize is acceptable

Flow:

1. Power off Node
2. Resize plan in MyAccount
3. Power on Node

Vertical scaling is useful early on, but it is not always a long-term strategy.

---

## Pattern 2: Horizontal scaling (Scale Groups)

Use when:

- You need high availability
- Traffic varies
- You want rolling updates

Typical setup:

- Create a golden image with your app pre-installed
- Create a Scale Group from that image
- Attach the Scale Group to a Load Balancer
- Define min/max Node count and scaling rules

Conceptual policy:

- CPU > 70% for 30s → add 1 Node
- CPU < 30% for 5 minutes → remove 1 Node

This reduces manual intervention when traffic spikes.

---

## Load balancing

Use a load balancer in front of multiple Nodes:

- Terminates TLS
- Health-checks backends
- Distributes traffic

Only the load balancer should have a public IP. Backend Nodes live on private networking.

---

## Rolling deployments

Safe deployment pattern:

1. Build new Image with updated app
2. Update Scale Group to use new Image
3. Let new Nodes join behind LB
4. Drain and remove old Nodes

This reduces the risk of large rollout failures.

---

## Pattern 3: Managed Kubernetes

Use when:

- You have multiple services
- You need auto-healing
- You want declarative deployments

High-level flow:

- Create a Kubernetes cluster
- Define Node Pools (with auto-scaling)
- Deploy services via manifests/Helm
- Expose via Ingress

This trades simplicity for flexibility. Choose it when you need that extra control.

---

## Data and state

Scaling compute is often easier than scaling state.

Avoid:

- Local disk for critical data
- In-memory-only sessions

Prefer:

- External databases
- Object storage
- Managed DB services

Stateless nodes scale more easily than long-lived, heavily customized servers.

---

## What’s next

- Create golden images: [Snapshots, images, and backups](../nodes/guides/snapshots-images-and-backups.md)
- Clean up common issues: [FAQ](/docs/myaccount/nodes/faq)

---
