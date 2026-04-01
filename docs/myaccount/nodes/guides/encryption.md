---
title: Encryption
description: Encryption options and practices for MyAccount Nodes
---

# Encryption

This guide helps you decide when to enable encryption and what that choice changes later.

## Outcome

You will know:

- when encryption can be enabled
- what happens to snapshots
- where saved-image behavior is limited

## When to use this guide

Use it before launch if you need encryption at rest. Encryption must be chosen during node creation.

## What encryption changes

In this documentation, encryption means:

- encryption is implemented with LUKS (Linux Unified Key Setup)
- root and data volumes are encrypted
- snapshots taken from encrypted nodes remain encrypted
- encryption is transparent in normal operation

## Supported node types for encryption

You can enable encryption on the following node types:

- **Linux Virtual Node**: A virtualized node ideal for general-purpose workloads
- **Linux Smart Dedicated Compute**: A high-performance, single-tenant node offering enhanced security and resource isolation

:::info
The Encryption option is only available during node creation. It will not be visible for non-encrypted nodes in the UI.
:::

## The irreversible part

Key behavior:

- encryption can be enabled only during node creation
- once activated, it cannot be disabled

Treat this as a launch-time design decision, not a later toggle.

## Create an encrypted node

High-level flow:

1. start standard node creation
2. choose OS and plan
3. enable the **Enable Encryption** checkbox in the security step
4. optionally provide a passphrase
5. launch the node

### Encryption passphrase

After selecting the **Enable Encryption** checkbox, you can optionally enter a passphrase. This passphrase adds an additional layer of security to your encrypted node.

:::tip
If you choose to set a passphrase, make sure to store it securely. You will need it for certain recovery operations.
:::

## Snapshot behavior

These rules apply:

- snapshots from encrypted nodes are automatically encrypted
- snapshots from unencrypted nodes stay unencrypted
- when you create a new node from an image derived from a snapshot, encryption is **not** inherited automatically by default
- if you want the new node encrypted, you must enable encryption again during creation

### Encrypted node indicators

- For encrypted nodes, the Encryption flag will be visible in the node details
- For non-encrypted nodes, the Encryption flag will not be visible

## Saved-image limitation

One important limitation:

- saving an encrypted image is not supported the same way as encryption-preserving snapshots
- attempts to create a saved image from an encrypted node result in an unencrypted image

This is one of the most important caveats to understand before relying on saved-image workflows.

## Export limitation

Image export is not available when the image is created from encrypted nodes.

## Related guides

- [Create your first node](create-your-first-node.md)
- [Snapshots, images, and backups](snapshots-images-and-backups.md)
- [Support matrix and limits](../reference/support-matrix-and-limits.md)
