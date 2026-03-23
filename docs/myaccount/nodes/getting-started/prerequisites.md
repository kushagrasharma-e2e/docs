# Prerequisites

This guide helps you avoid the common "launch succeeded, but I still can't use the node" failure mode.

Use it before [Quickstart](quickstart.md) or [Create your first node](../guides/create-your-first-node.md).

## Required

You need:

- an E2E MyAccount you can log in to
- access to the MyAccount portal
- a working email address for node notifications and password retrieval

If you plan to automate node actions through the API, you may also need an API token. This guide focuses on the portal flow first.

## Choose your access method early

For Linux nodes, decide whether you will use:

- SSH keys
- password-based SSH
- one-time password emailed after launch

For Windows nodes, plan for:

- RDP access after launch
- an Administrator password from the portal workflow or email

If you choose SSH-only access and disable password login, make sure you have tested your key pair locally first.

## Optional items that become required for specific workflows

Bring these only when needed:

- `SSH public key`: recommended for Linux node access
- `VPC`: needed if you want private networking from day one
- `reserved IPv4`: needed if you want a stable public address at launch
- `volume`: needed if the workload needs extra persistent storage
- `E2E Object Storage bucket`: needed for custom-image import or image export
- `Access key` and `Secret key` for Object Storage: needed for private bucket import or export
- `PuTTY` or similar SSH client on Windows: needed for SSH access to Linux nodes from Windows
- `Microsoft Remote Desktop` or `rdesktop`: needed for Windows Server access from Mac or Linux

## For custom image imports

Before importing your own image, make sure you have:

- a supported format: `qcow2`, `qed`, `raw`, `vdi`, or `vhd`
- a single disk partition
- disk size no larger than `2048 GB`
- the OpenNebula `one-context` package installed in the guest
- `cloud-init` disabled or removed if it conflicts

Start with [Custom images and migration](../guides/custom-images-and-migration.md) if this is your path.

## For monitoring

Monitoring is preconfigured for nodes, but if you are restoring or importing an image, you may need the Zabbix agent path described in [Monitoring and alerts](../guides/monitoring-and-alerts.md).

## Good defaults for a first launch

If you are unsure, these are safe defaults for a first launch:

- launch one Linux node
- keep password login enabled until SSH access is confirmed
- use the default security group first, then tighten later
- skip VPC unless you already know the network design
- skip reserved IP unless you specifically need a stable public address
- enable monitoring alerts after the node is healthy

## Next step

Continue with [Quickstart](quickstart.md).
