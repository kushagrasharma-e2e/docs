---
title: Migrate An AWS Image
description: Migrate an AWS image into MyAccount Nodes
---

# Migrate An AWS Image

This use case is for teams that already have a working EC2 instance and want to run that environment in E2E without rebuilding it manually.

## Good fit

Use this path when:

- your app is already configured in AWS
- preserving the machine state matters
- you are comfortable handling AMI export and object storage

## Migration flow

This path typically looks like this:

1. prepare the EC2 instance by installing OpenNebula `one-context`
2. create an AMI
3. export the image to raw format through S3
4. download the raw file
5. upload it to E2E Object Storage
6. import it into E2E Saved Images
7. create a node from the imported image
8. verify the application in E2E

## What this gets you

This path is most useful when:

- you already have a tuned application image
- you want repeatability
- you want to avoid rebuilding packages, config, and runtime state manually

## Common mistakes

- skipping `one-context`
- leaving conflicting init tooling in place
- not verifying the exported image format and size constraints
- assuming import time will be short for large images

## Related guides

- [Custom images and migration](../guides/custom-images-and-migration.md)
- [Golden image use case](build-a-reusable-golden-image.md)
