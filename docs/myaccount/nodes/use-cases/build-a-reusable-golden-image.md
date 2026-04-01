---
title: Build A Reusable Golden Image
description: Build a reusable golden image for MyAccount Nodes
---

# Build A Reusable Golden Image

This use case is for teams that want a repeatable starting point for many nodes.

## Good fit

Use this when:

- you repeatedly install the same packages and configuration
- you want faster environment creation
- you want to clone a tested server into more nodes

## Workflow

1. Launch and configure a base node.
2. Validate access, packages, services, and monitoring.
3. Power off if required by your image flow.
4. Save the node as an image.
5. Create future nodes from that image.
6. Optionally export the image to Object Storage or copy it across regions where supported.

## Why this is useful

Common supported actions include:

- saved image creation
- renaming and project transfer
- creating new nodes from saved images
- exporting images to Object Storage
- creating scale groups from some saved image families

## Caveats

- encrypted-node saved-image behavior is limited; see [Encryption](../guides/encryption.md)
- saved image deletion is blocked when the image is tied to a scale group
- you can only create the same or a higher configuration node from the saved image

## Related guides

- [Snapshots, images, and backups](../guides/snapshots-images-and-backups.md)
- [Custom images and migration](../guides/custom-images-and-migration.md)
