---
title: Overview
description: Overview of the MyAccount Nodes section and learning path
---

# Overview

This guide helps you understand what success looks like before you start.

By the end, you should know:

- what an E2E MyAccount node is
- which launch path fits your workload
- what you need before creating one
- where to go next for a first successful launch

## What is a node in this documentation?

A node is the compute unit you launch from E2E MyAccount. In practice, that means a virtual machine or dedicated-style compute instance you can configure, start, stop, monitor, snapshot, and access remotely.

Common node paths include:

- standard virtual compute nodes
- smart dedicated compute nodes
- Windows-based nodes
- E1 series nodes
- marketplace-based node launches
- custom-image-based launches

For a deeper explanation, see [What this node is](../concepts/what-is-the-node.md).

## Who these docs are for

These docs are written for:

- developers who need a VM quickly
- operators who need access, monitoring, snapshots, and recovery steps
- teams migrating an existing machine image into E2E
- Windows admins working with RDP or Active Directory

## Typical first outcomes

Most users start with one of these goals:

1. Launch a Linux node and log in with SSH.
2. Launch a Windows node and connect with RDP.
3. Start from a marketplace image such as WordPress.
4. Import an existing custom image.
5. Turn a configured node into a reusable saved image.

## The shortest path to first success

1. Check [Prerequisites](prerequisites.md).
2. Follow [Quickstart](quickstart.md).
3. If login is the blocker, go to [Connect to your node](../guides/connect-to-your-node.md).
4. If you need a public image instead of a blank OS, use [Marketplace images](../guides/marketplace-images.md).
5. If you already have a VM image elsewhere, use [Custom images and migration](../guides/custom-images-and-migration.md).

## What these docs cover best

These docs give the strongest coverage for:

- creating nodes from MyAccount
- selecting plans and billing modes
- network and security choices
- monitoring and alerts
- snapshots and saved images
- importing custom images
- common access and performance troubleshooting

The biggest gaps are around API examples, exact plan availability, and a single authoritative limits table. Where the public docs do not provide a complete matrix, prefer the current MyAccount UI and product pricing surfaces before making production decisions.
