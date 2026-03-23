# What This Node Is

This page gives you the mental model you need before you start comparing plans or workflows.

## In one sentence

An E2E MyAccount node is a compute instance you launch and operate from the E2E portal, with options for OS selection, network and security controls, storage, monitoring, snapshots, saved images, and remote access.

## What you can do with it

A node can be used to:

- run a Linux or Windows server
- host an application or website
- boot from a marketplace image
- attach extra storage volumes
- connect to VPC and public networking
- enable monitoring and alerting
- create snapshots and saved images
- export or import images through Object Storage
- recover access through console or recovery mode
- support Windows administrative tasks such as Active Directory setup

## Typical node lifecycle

Most node workflows follow this lifecycle:

1. Launch a node.
2. Access it.
3. Operate it.
4. Protect it with snapshots or backups.
5. Reuse it as an image.
6. Move it across projects or regions.
7. Recover or troubleshoot it.

## Portal-first, with API as a secondary path

Most tasks in this documentation are explained through the MyAccount portal. Where API-driven workflows are important, these guides mention them without inventing unsupported examples.

## Related reading

- [Node types and billing](node-types-and-billing.md)
- [Networking, storage, and security](networking-storage-and-security.md)
- [Create your first node](../guides/create-your-first-node.md)
