# Marketplace Images

This guide helps you launch from an application image instead of building a server from a blank OS.

Use it when your goal is "I want a working stack faster," not "I want to bootstrap everything myself."

## Outcome

You will select a marketplace image, review its details, and launch a node from it.

## When to use it

Use Marketplace when:

- you want a prebuilt app image such as WordPress
- you prefer a guided app-first path
- you still want to land inside the standard node management flow afterward

## Marketplace features

E2E Networks Marketplace offers:

- **Centralized Access**: Browse, purchase, and deploy apps, VM images, containers, and SaaS solutions
- **Multi-Format Offerings**: 
  - VM Images (1-Click, Packer-built)
  - Kubernetes Helm Charts
  - SaaS integrations
  - AI applications
  - Software license add-ons

## Prerequisites

- a MyAccount login
- a plan for how you will access the node after launch

## Step-by-step

### 1. Open Marketplace

Go to [https://marketplace.e2enetworks.com/](https://marketplace.e2enetworks.com/) and sign in.

Marketplace sign-in options may include:
- Google
- GitHub
- E2E account credentials
- SignUp for new accounts

### 2. Search or filter

Use:

- search bar
- solution-type filters

to find the image you need.

### 3. Review image details

Before launching, read:

- **Overview**: Description of the selected image
- **Additional Information**: Technical details about the image's configuration

This is where you confirm the image is a fit for your workload.

### 4. Launch the node

Click **Launch Node** and continue through the node configuration flow for:

- plan selection
- network and security
- backup and storage

From here, the launch experience converges with [Create your first node](create-your-first-node.md).

## Example use

If you want to deploy WordPress quickly:

1. choose a WordPress marketplace image
2. launch a plan sized for your expected traffic
3. confirm access to the server
4. secure the site and add monitoring

For WordPress-specific HTTPS, import/export, or application troubleshooting, use the official WordPress guidance that matches your image and deployment path.

## Expected result

You end with:

- a running node created from a marketplace image
- the standard Manage Node experience for day-2 operations

## Common mistakes

- treating Marketplace as a separate management product after launch
- skipping the image detail page and missing what is bundled
- assuming every marketplace image has the same login defaults

## Related guides

- [Create your first node](create-your-first-node.md)
- [Connect to your node](connect-to-your-node.md)
- [Linux app server use case](../use-cases/launch-a-linux-app-server.md)
