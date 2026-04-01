---
title: Run A Windows Domain Controller
description: Run a Windows domain controller on MyAccount Nodes
---

# Run A Windows Domain Controller

This use case is for Windows administrators who want to use an E2E node as the base for an Active Directory domain controller.

## Good fit

Use this path when:

- you need a Windows Server node
- you will administer it over RDP
- your goal is lab, test, or production-style AD setup

## Workflow

1. Launch a Windows node.
2. Confirm RDP access.
3. Open Server Manager.
4. Follow the AD DS promotion flow:
   - promote the server
   - create a new forest
   - define the root domain name
   - complete controller options
   - run prerequisites
   - install and reboot
5. Join a client machine to the domain and verify in Active Directory Users and Computers.

## Important caution

This guide covers the promotion procedure, but not larger domain design questions such as DNS architecture, backup, redundancy, or security baselines. Plan those separately.

## Related guides

- [Windows and Active Directory](../guides/windows-and-active-directory.md)
- [Connect to your node](../guides/connect-to-your-node.md)
