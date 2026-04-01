---
title: Custom Images And Migration
description: Use custom images and migration workflows for MyAccount Nodes
---

# Custom Images And Migration

This guide helps you bring an existing machine into E2E instead of rebuilding it by hand.

## Outcome

You will understand how to:

- prepare a supported image
- upload it to E2E Object Storage
- import it into Saved Images
- create a node from it

It also points to the AWS-to-E2E migration workflow covered in this documentation.

## When to use this guide

Use it when:

- you already have a working VM elsewhere
- you maintain a "golden image"
- rebuilding manually would be slow or error-prone

## Prerequisites

- an E2E Object Storage bucket
- a supported image format
- the OpenNebula `one-context` package installed in the guest
- `cloud-init` removed or disabled if it conflicts

## Why `one-context` matters

E2E custom image imports rely on OpenNebula contextualization for guest initialization. Public OpenNebula docs describe this as the mechanism that configures networking, hostname, credentials, and boot-time actions inside the guest. That is why the import flow requires `one-context` before you capture the image.

## Supported formats and limits

Supported formats include:

- `qcow2`
- `qed`
- `raw`
- `vdi`
- `vhd`

The documented limits are:

- single disk partition
- bootable from MBR
- maximum disk size `2048 GB`

## Import path 1: public URL

Use this when the image object is reachable by public URL from E2E Object Storage.

High-level flow:

1. upload the image to Object Storage
2. open **Nodes -> Saved Images**
3. click **Import Custom Image**
4. provide:
   - public URL
   - custom image name
   - OS type
5. submit the import
6. wait for the image to appear in Saved Images

## Import path 2: private EOS bucket

Use this when the object is in a private bucket.

You will provide:

- custom image name
- bucket name
- object path
- OS
- access key
- secret key

## Example `one-context` install for Ubuntu

```bash
wget https://github.com/OpenNebula/addon-context-linux/releases/download/v6.6.0/one-context_6.6.0-1.deb
sudo apt update
sudo apt --fix-broken install -y
sudo dpkg -i one-context_6.6.0-1.deb
sudo systemctl enable one-context
```

After installation, the service should remain inactive and run later through the E2E-side import flow.

## Install one-context on other Linux distributions

### CentOS / Fedora / RHEL 7.x

```bash
wget https://github.com/OpenNebula/addon-context-linux/releases/download/v6.6.0/one-context-6.6.0-1.el7.noarch.rpm
sudo yum install -y epel-release
sudo yum install -y one-context-6.6.0-1.el7.noarch.rpm
sudo systemctl enable one-context
```

### Rocky Linux / AlmaLinux / CentOS 8+

```bash
wget https://github.com/OpenNebula/addon-context-linux/releases/download/v6.6.0/one-context-6.6.0-1.el8.noarch.rpm
sudo dnf install -y one-context-6.6.0-1.el8.noarch.rpm
sudo systemctl enable one-context
```

### Fedora

```bash
wget https://github.com/OpenNebula/addon-context-linux/releases/download/v6.6.0/one-context-6.6.0-1.fc38.noarch.rpm
sudo dnf install -y one-context-6.6.0-1.fc38.noarch.rpm
sudo systemctl enable one-context
```

### OpenSUSE 42, 15

```bash
wget https://github.com/OpenNebula/addon-context-linux/releases/download/v6.6.0/one-context-6.6.0-1.suse.noarch.rpm
sudo zypper --no-gpg-check install -y one-context-6.6.0-1.suse.noarch.rpm
sudo systemctl enable one-context
```

### Alpine Linux

```bash
wget https://github.com/OpenNebula/addon-context-linux/releases/download/v6.6.0/one-context-6.6.0-r1.apk
apk add --allow-untrusted one-context-6.6.0-r1.apk
```

### FreeBSD 11, 12

```bash
wget https://github.com/OpenNebula/addon-context-linux/releases/download/v6.6.0/one-context-6.6.0_1.txz
pkg install -y curl bash sudo base64 ruby open-vm-tools-nox11
pkg install -y one-context-6.6.0_1.txz
```

### Windows

Download the MSI package into `C:\`:

```powershell
(New-Object Net.WebClient).DownloadFile("https://github.com/OpenNebula/addon-context-windows/releases/download/v5.8.0/one-context-5.8.0.msi", "C:\one-context-5.8.0.msi")
```

Then double-click the downloaded MSI to install.

:::info Important
If you have cloud-init present in your virtual machine for initialization, disable the respective cloud-init service before taking the image. Cloud-init will conflict with the OpenNebula context package and may result in failure of the virtual machine initialization process.

For Debian/Ubuntu systems, the one-context package automatically removes cloud-init during installation.
:::

## AWS migration path

The full AWS workflow is:

1. prepare the AWS instance with `one-context`
2. create an AMI
3. export it to an S3 bucket in raw format
4. download the raw file
5. upload it to E2E Object Storage
6. import it into E2E Saved Images
7. create a node from that image

Use [AWS migration use case](../use-cases/migrate-an-aws-image.md) for the shortest practical version.

## Expected result

You end with:

- a new saved image in E2E
- a launchable node template derived from your existing VM

## Common mistakes

- forgetting `one-context`
- leaving `cloud-init` active when it conflicts
- exceeding the disk requirements
- assuming import is instant
- assuming stored size will match source size exactly

Imported image size in E2E can differ significantly from the original size.

## Related guides

- [Snapshots, images, and backups](snapshots-images-and-backups.md)
- [AWS migration use case](../use-cases/migrate-an-aws-image.md)
- [Support matrix and limits](../reference/support-matrix-and-limits.md)
