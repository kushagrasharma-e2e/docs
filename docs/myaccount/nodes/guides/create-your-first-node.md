# Create Your First Node

This guide helps you launch a usable node from the MyAccount portal without getting lost in optional features.

Use it when you want to create a base Linux or Windows node from scratch.

## Outcome

You will launch a node and arrive at a state where you can connect and start configuring your workload.

## When to use this guide

Use this guide if:

- you want a base OS image
- you are not starting from Marketplace
- you are not importing a custom image

If you need those paths instead:

- [Marketplace images](marketplace-images.md)
- [Custom images and migration](custom-images-and-migration.md)

## Prerequisites

- [Prerequisites](../getting-started/prerequisites.md)
- a chosen OS family and access method

## Step-by-step

### 1. Open the launch flow

1. Sign in to MyAccount.
2. Open **Compute -> Nodes**.
3. Click **Add New Node**.

### 2. Choose operating system and version

Select:

- Linux or Windows
- the OS version
- the node family and plan size

Examples include Ubuntu, Debian, CentOS, Windows Server variants, and preinstalled stacks for some plan families.

Node categories include:

- **Linux Virtual Nodes**: CentOS, Ubuntu, Debian, cPanel, Plesk, Webuzo
- **CPU Intensive Cloud**: High-performance with C3 series processors
- **High Memory Cloud**: Double vCPUs, triple RAM
- **Windows Virtual Node**: Windows Server 2019, 2016, 2012
- **Smart Dedicated Nodes**: High-Frequency Cloud, Large CPU, High-Frequency Double Disk

### 3. Choose billing mode

Where available, select:

- hourly billed
- committed period

If billing choice matters more than raw specs, review [Node types and billing](../concepts/node-types-and-billing.md) first.

### 4. Configure network and security

Review these fields carefully:

- `Security group`
- `VPC` if needed
- `SSH keys` for Linux
- `Disable password for remote SSH access`
- `One-time password`
- `Reserve IPv4`
- `IPv6`
- `BitNinja`
- `Encryption`

Important notes:

- SSH key login is not applicable for Windows compute nodes at launch
- if you lose your SSH key after disabling password login, you can lock yourself out
- when launching more than one node at once, reserved IPs and volumes are not attached to all of them automatically

### 5. Configure backup and storage

Optionally:

- enable backup
- attach a volume
- add scripts if applicable to your template

Then click **Launch Node**.

### 6. Wait for the node to become ready

The node appears in the Manage Node page after provisioning. You may also receive login information by email, including a password retrieval link that expires in 7 days.

## Example first-launch choices

For a small Linux web app:

- Ubuntu LTS image
- hourly billing
- default security group to start
- one SSH key
- password login left enabled until first SSH succeeds
- no VPC on day one
- no reserved IP unless DNS or failover requires it

## Getting your node password

After creating your node, you will receive an email with a secure password retrieval link. The link expires in 7 days.

## Expected result

You should have:

- a node in `Running` state
- public or private networking configured as intended
- at least one confirmed remote access path

## Common mistakes

- picking committed billing before validating the workload
- disabling password SSH access before testing your key
- assuming all node families support the same snapshot and resize behavior
- expecting encrypted nodes to behave the same as unencrypted saved-image flows

## Related guides

- [Connect to your node](connect-to-your-node.md)
- [Daily operations](daily-operations.md)
- [Encryption](encryption.md)
