---
title: Daily Operations
description: Day-2 operational tasks for MyAccount Nodes
---

# Daily Operations

This guide covers the actions you are most likely to use after the node is already live.

## Outcome

You will know what actions exist, when to use them, and what to watch for before clicking them.

## Common actions

### Power off

Use this when you need the node shut down cleanly.

Important: the general node docs state that powering off a node does **not** stop billing. E1 series is documented separately with different stop-related billing behavior.

### Start

Use this to power on a node that is off.

### Reboot

Use this when the operating system is unhealthy but you do not want to reinstall.

### Save image

Use this when you want a reusable copy of the current node state. For Windows nodes, power off the node before saving an image. In standard image flows, the node should also be powered off before saving an image.

### Move to another project

Use this to transfer a node within the same CRN. Project transfer is disabled for E1 series.

### Convert to committed node

Use this when you launched hourly first and later want a committed plan, if your node family is eligible.

### Lock node

Use this when you want to prevent operational changes such as stop, restart, or resize.

### Bulk actions

Bulk actions are available for up to 10 nodes at a time:

- power off
- power on
- reboot
- lock
- unlock

## Change hostname on Linux

To change the hostname of your Linux node:

### Step 1: Check current hostname

```bash
hostname
```

### Step 2: Set new hostname

```bash
hostnamectl set-hostname new-hostname
```

### Step 3: Edit network configuration

For CentOS, edit `/etc/hostname`:

```bash
vi /etc/hostname
```

### Step 4: Edit hosts file

Edit `/etc/hosts` and update your old hostname:

```bash
vi /etc/hosts
```

### Step 5: Make hostname persistent

To make the hostname persist across reboots, move the hostname configuration:

```bash
cd /etc/one-context.d/**
ls -la
```

Move the hostname directory to root:

```bash
mv 05-hostname /root/
```

For KVM-based servers:

```bash
mv net-15-hostname /root/
```

### For cPanel servers

1. Follow the steps above
2. Use WHM's **Change Hostname** interface (WHM >> Home >> Networking Setup >> Change Hostname)
3. Add to `/etc/sysctl.conf`:

```bash
kernel.hostname = hostname.domainname.com
kernel.domainname = domainname.com
```

4. Apply changes:

```bash
sysctl -p /etc/sysctl.conf
```

## Node details

The Node Details tab shows:

- Node configuration details
- Plan and pricing details
- Memory and storage details
- For committed nodes: Committed plan & price, period end date, and settings information

## Volumes management

Volumes are storage units that can be attached to nodes to provide persistent data storage.

### Attaching a volume

:::info
Your node should be in a running or powered-off state before attaching a volume.
:::

To attach a volume:
1. Go to the Volumes tab in node details
2. Click Attach Volume
3. Select the desired volume from the list

### Volume actions

Once attached, you can:

- **Detach**: Remove the volume from the node
- **Create Snapshot**: Capture the current state of the volume
- **Convert to Committed**: Change the volume type to committed
- **Upgrade Volume**: Increase the size or upgrade the configuration

## Network management

The Network tab provides information about:

- Public IPv4 address
- Private IPv4 address
- Reserved (Addon) IPv4 address
- IPv6 address
- VPC attachments

### Public IP options

- **Detach public IP**: Remove the assigned public IP
- **Reserve public IP**: Keep the assigned IP in your account even after node termination

### VPC attachments

- A node can have multiple VPCs attached
- Maximum of 3 VPCs per node
- Maximum of 2 private IPs from a single VPC per node

To attach a VPC:
1. Go to the Network section
2. Click to view active VPCs
3. For Custom VPC, select subnet and preferred IP (both optional)
4. For Default VPC, it attaches directly

### Floating IP

A floating IP is a public IP address that can be dynamically moved between nodes. It is ideal for high availability configurations.

## Security management

### SSH Keys

SSH keys provide secure password-less authentication. You can add additional SSH keys from the Security tab.

:::note
By default, password-based login is enabled on newly launched E2E nodes.
:::

### BitNinja

BitNinja is a server security tool that protects against cyber-attacks. You can enable it at node creation time or later from the Security tab.

## Monitoring

View monitoring graphs for CPU, memory, disk, and network metrics. Each graph shows historical data collected from your node.

## Alerts

Server health alerts are default-created for new nodes using recommended parameters. You can also create custom alerts with your own trigger conditions.

## Audit Log

The Node Audit Logs provide comprehensive information about:

- **Activity Timeline**: Chronological sequence of all actions with timestamps and status
- **Action Logs**: Both system-generated and user-triggered operations
- **Billing Logs**: Usage-based charges, subscription events, and financial operations

## Example workflow: safe restart after a bad deploy

1. Check Monitoring for CPU, memory, and disk pressure.
2. Check Audit Log for recent changes.
3. Open console if remote access is degraded.
4. Reboot the node.
5. If the issue persists, consider [Recovery mode](../troubleshooting/access-and-performance-issues.md) or restore from image/snapshot.

## Related guides

- [Snapshots, images, and backups](snapshots-images-and-backups.md)
- [Monitoring and alerts](monitoring-and-alerts.md)
- [Operations reference](../reference/operations-reference.md)
