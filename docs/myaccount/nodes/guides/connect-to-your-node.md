---
title: Connect To Your Node
description: Connect to a MyAccount node over SSH or RDP
---

# Connect To Your Node

This guide helps you get from "node is running" to "I am actually inside the machine."

## Outcome

You will connect to:

- a Linux node over SSH
- or a Windows node over RDP

## Prerequisites

- a launched node in `Running` state
- the node IP or hostname
- valid credentials or SSH key

If the node exists but access fails, jump to [Access and performance issues](../troubleshooting/access-and-performance-issues.md).

## Linux: SSH access

### Option 1: password-based SSH

Use this if you launched with password login available.

```bash
ssh username@PUBLIC_IP
```

On first login, accept the host key if prompted. Then enter the password from the email or password retrieval flow.

### Option 2: SSH key login

Use this if you attached an SSH key during launch.

```bash
ssh username@PUBLIC_IP
```

If your key is not in the default location, use your SSH client's usual key-selection behavior.

### First-time connection warnings

When connecting for the first time, you may see:

```
The authenticity of host 'x.x.x.x (x.x.x.x)' can't be established.
RSA key fingerprint is xxxxxx.
Are you sure you want to continue connecting (yes/no)?
```

Type `yes` to continue.

## Windows desktop to Linux node

PuTTY is a common choice for SSH from Windows. Configure:

- host as `root@hostname` or your chosen user
- saved session
- private key under `Connection -> SSH -> Auth` if using key-based auth

### PuTTY configuration steps

1. Launch PuTTY
2. In Session, set Host Name to `root@hostname` or your username@IP
3. Go to Connection -> Data and set Auto-login username
4. Go to Connection -> SSH -> Auth and browse for your private key file
5. Save the session for future use

## Windows Server: RDP access

### From Windows

1. Open `mstsc` (press Windows + R, type "mstsc", press Enter)
2. Enter the server IP or hostname
3. Connect with the Administrator credentials

### From Linux

If `rdesktop` is installed:

```bash
rdesktop SERVER_IP
```

To install rdesktop:

```bash
# CentOS/Fedora
sudo yum install rdesktop

# Ubuntu/Debian
sudo apt-get install rdesktop
```

### From macOS

Use Microsoft Remote Desktop and create a connection with:

1. Install Microsoft Remote Desktop from the Mac App Store
2. Click New or press Command+N to create a connection
3. Fill in settings:
   - **PC name**: Server IP or hostname
   - **Username**: `Administrator`
   - **Password**: Your admin password
4. Save and connect

If using a self-signed SSL certificate, you may need to trust the certificate before connecting.

## If remote access fails

Check:

- node state in MyAccount
- security group and firewall rules
- whether ping/SSH/RDP is intentionally blocked
- whether CPU, memory, or disk pressure has made the node unresponsive

If needed, use:

- console access
- reboot
- recovery mode for supported Linux recovery scenarios

See [Access and performance issues](../troubleshooting/access-and-performance-issues.md).

## Related guides

- [Daily operations](daily-operations.md)
- [Windows and Active Directory](windows-and-active-directory.md)
