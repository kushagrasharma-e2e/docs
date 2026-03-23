# Quickstart

This guide gets you from zero to a usable node as quickly as possible.

Use it when you want your first successful launch, not a deep tour of every option.

## Outcome

You will:

- create a node in MyAccount
- wait for it to become ready
- retrieve credentials
- connect over SSH or RDP

## Prerequisites

- [Prerequisites](prerequisites.md)
- a decision on Linux vs Windows

## Steps

### 1. Open the node creation flow

1. Sign in to the MyAccount portal.
2. Open **Compute -> Nodes**.
3. Click **Add New Node**.

If you want a prebuilt application image instead of a base OS, use [Marketplace images](../guides/marketplace-images.md) instead.

### 2. Choose OS and plan

Pick:

- an operating system
- the OS version
- a plan category and size
- a billing mode such as hourly or committed when offered

Available options include Linux virtual nodes, Windows virtual nodes, smart dedicated options, and E1 series nodes. See [Node types and billing](../concepts/node-types-and-billing.md).

### 3. Configure network and security

At minimum, review:

- security group
- SSH key for Linux
- password behavior

Optional choices include:

- VPC
- reserved IPv4
- IPv6
- BitNinja
- encryption

If you are new, do not disable password access until you have verified SSH key access.

### 4. Configure backup and storage

Optionally:

- enable backup
- attach a volume
- add scripts if your template supports it

Then click **Launch Node**.

### 5. Wait for the node to finish provisioning

Provisioning typically takes a few minutes. When complete:

- you are redirected to the Manage Node page
- you receive an email with login information or a password retrieval link

### 6. Connect

For Linux:

```bash
ssh username@PUBLIC_IP
```

For Windows:

- use Remote Desktop from Windows or Mac
- or `rdesktop SERVER_IP` from Linux if installed

Use [Connect to your node](../guides/connect-to-your-node.md) for the full flow.

## Expected result

You should end with:

- a node visible in the Manage Node page
- a running state
- working remote access

## Common mistakes

- no SSH key available after disabling password login
- assuming Windows supports the same SSH launch flow as Linux
- launching multiple nodes and expecting one reserved IP or one volume to attach to all of them automatically
- expecting snapshots on all plan families

## Next steps

- Learn the moving parts: [Networking, storage, and security](../concepts/networking-storage-and-security.md)
- Run day-2 operations: [Daily operations](../guides/daily-operations.md)
- Protect and reuse the node: [Snapshots, images, and backups](../guides/snapshots-images-and-backups.md)
