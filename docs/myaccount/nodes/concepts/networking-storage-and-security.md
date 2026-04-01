---
title: Networking, Storage, And Security
description: Networking, storage, and security concepts for MyAccount Nodes
---

# Networking, Storage, And Security

This page explains the main choices you make during launch and later operations.

## Networking choices

### Public IPv4

Standard node launches get a public IPv4 by default unless you attach a reserved IP as the primary public IP. E1 series nodes are documented differently: they launch without a default public IP.

### Reserved IPv4 and add-on IPs

A reserved IP belongs to your account and can be attached or detached as needed. Use it when you need a stable address that outlives one specific node.

### Floating IP

A floating IP is a public IP that can move between nodes for high-availability style setups.

### Private IPv4 and VPC

Use VPC attachments for private communication between resources. The Manage Node docs also note:

- a node can have multiple VPCs attached
- maximum 3 VPCs per node
- maximum 2 private IPs from a single VPC per node

### IPv6

IPv6 can be enabled at launch and attached later in supported flows.

## Storage choices

### Root disk

The root disk holds the operating system. On E1 series, root storage selection is a required launch choice and can be increased later with documented constraints.

### Volumes

Volumes add persistent storage to a node. Common actions include:

- attach
- detach
- snapshot
- convert to committed
- upgrade volume

### Snapshots

Snapshots capture point-in-time state for supported node families. Snapshot support is listed for `C3`, `M3`, `SDC3`, `E1`, and `WSDC4` VMs.

### Saved images

Saved images are reusable templates created from a node or snapshot. They are useful for cloning known-good environments or creating higher-plan replacements.

## Security choices

### Security groups

You choose a security group during launch, with `default` commonly shown first.

### SSH keys

Recommended for Linux node access. The launch flow allows adding SSH keys and optionally disabling password SSH access.

### BitNinja

BitNinja is presented as an optional server security add-on that can be enabled at launch or after creation.

### Encryption

Encryption can be enabled only during node creation. Once enabled, it cannot be disabled. See [Encryption](../guides/encryption.md).

## Related reading

- [Create your first node](../guides/create-your-first-node.md)
- [Snapshots, images, and backups](../guides/snapshots-images-and-backups.md)
- [Configuration reference](../reference/configuration-reference.md)
