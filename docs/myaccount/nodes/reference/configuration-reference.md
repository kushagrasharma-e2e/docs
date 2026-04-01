---
title: Configuration Reference
description: Configuration reference for MyAccount Nodes
---

# Configuration Reference

This page is a compact reference for common launch-time choices.

## Launch-time choices

### Operating system

Available launch paths include Linux and Windows families, plus marketplace and custom-image-based launches.

### Plan / node family

Common node families include:

- Linux Virtual Node
- Windows Virtual Node
- Linux Smart Dedicated Node
- Windows Smart Dedicated Compute Node
- E1 Series

### Billing mode

Documented options include:

- hourly billed
- committed period, where offered

### Network and security

Documented fields include:

- security group
- VPC
- SSH keys
- disable password for remote SSH access
- one-time password
- reserved IPv4
- IPv6
- BitNinja
- encryption

### Backup and storage

Documented options include:

- enable backup
- attach volume
- launch scripts in applicable flows

## Saved image import fields

### Public URL import

- public URL
- custom image name
- OS type

### Private EOS bucket import

- custom image name
- bucket name
- object path
- OS
- access key
- secret key

## Monitoring alert fields

- trigger type
- operator
- threshold
- severity
- user group

## Related guides

- [Create your first node](../guides/create-your-first-node.md)
- [Custom images and migration](../guides/custom-images-and-migration.md)
- [Monitoring and alerts](../guides/monitoring-and-alerts.md)
