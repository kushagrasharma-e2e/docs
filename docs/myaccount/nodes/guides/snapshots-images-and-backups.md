# Snapshots, Images, And Backups

This guide helps you protect a running environment and reuse it later.

## Outcome

You will know when to use:

- snapshots
- saved images
- scheduled snapshots
- lifecycle cleanup

## Choose the right artifact

### Snapshot

Use a snapshot when you want a point-in-time recovery point for a node and selected volumes.

Snapshots are available only for `C3`, `M3`, `SDC3`, `E1`, and `WSDC4` VMs.

### Saved image

Use a saved image when you want to:

- create another node from the same build
- create a scale group from a supported saved image
- export the image to Object Storage

### Backup / CDP

Backup and CDP are referenced in several places, but setup is not fully covered in this node section. Treat backup as a separate capability from snapshots and saved images.

## Create a snapshot

You can create a snapshot from:

- the node `Actions` menu
- the `Snapshot Now` button in the node details flow
- a schedule

Typical flow:

1. choose the node
2. open the snapshot action
3. select the root disk and any attached volumes you want included
4. create the snapshot

## Snapshot actions

From the snapshot list, you can perform these actions:

- **Save as Image**: Convert a snapshot to a reusable saved image
- **Lock**: Prevent snapshot deletion
- **Unlock**: Remove the lock to allow deletion
- **Delete**: Permanently remove the snapshot

### Lock and unlock snapshots

Locking a snapshot prevents it from being deleted until the lock is removed. This is useful for protecting critical recovery points.

## Schedule snapshots

Supported schedule patterns include:

- daily
- weekly
- monthly

Available time windows include:

- `12:00 AM - 01:00 AM`
- `08:00 AM - 09:00 AM`
- `06:00 PM - 07:00 PM`

### Schedule snapshots on the last day of the month

To schedule a snapshot on the last day of the month, select the **Monthly** interval and choose **Last Day** as the date.

## Apply snapshot lifecycle rules

Use lifecycle rules to delete scheduled snapshots automatically after a retention window such as:

- 1 day
- 3 days
- 7 days
- 15 days
- 1 month
- 3 months
- 6 months
- 1 year

## Transfer image across regions

You can copy a saved image to another region using the create copy feature:

1. Create a saved image from your node
2. Wait for the image status to become **Ready**
3. Click **Create Copy** in the Actions menu
4. Select the destination region
5. Specify a new name for the image
6. Click **Create**

The image will be copied to the selected region. Once complete, you can create nodes from the image in the new region.

## Create and manage saved images

From a saved image, you can:

- rename
- move to another project
- export to Object Storage
- delete
- create a new node
- create a scale group from supported images

### Saved image pricing

All saved images are billed only for the disk space used:
- ₹ 4 per GB per month (exclusive of 18% GST)

## Important caveats

- all management operations are disabled while an image is being saved
- saved image deletion is blocked when associated with a scale group
- you can only create the same or a higher configuration node from a selected image
- encrypted node image behavior has important limitations; see [Encryption](encryption.md)

## Example workflow: clone a known-good app server

1. Power off the source node if required by your image path.
2. Save the image.
3. Wait for image status to become ready.
4. Create a new node from the saved image.
5. Choose the same or higher plan.
6. Finish launch settings and validate the new node.

## Related guides

- [Daily operations](daily-operations.md)
- [Custom images and migration](custom-images-and-migration.md)
- [Golden image use case](../use-cases/build-a-reusable-golden-image.md)
