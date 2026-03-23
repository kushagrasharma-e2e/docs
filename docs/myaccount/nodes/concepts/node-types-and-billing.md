# Node Types And Billing

This page helps you choose the right launch path and avoid billing surprises.

## Main node families

These are the main user-visible families covered in this documentation:

- `Linux Virtual Node`
- `Windows Virtual Node`
- `Linux Smart Dedicated Node`
- `Windows Smart Dedicated Compute Node`
- `E1 Series`
- `Marketplace-based nodes` built from app images

The exact plan catalog lives in the product and pricing surfaces.

### Linux Virtual Nodes

Based on CentOS, Ubuntu, Debian, cPanel, Plesk, and Webuzo with various subcategories.

### CPU Intensive Cloud

Uses latest generation Intel processors (C3 series), offering high-performance compute instances with high IOPS and memory for web-scale applications.

### High Memory Cloud

Offers double the amount of vCPUs and more than triple the amount of RAM at affordable pricing.

### Windows Virtual Node

Supports Microsoft Windows Server 2019, 2016, and 2012, as well as MS-SQL Web Edition, MS-SQL Standard Edition, and Plesk pre-installed.

### Smart Dedicated Nodes

Provide superior performance, reliability, dedicated network ports, and easy regulatory compliance. Subcategories include:
- High-Frequency Cloud
- Large CPU
- High-Frequency Double Disk

## Billing modes you will encounter

### Hourly

This is the default pattern for many node launches. In the general node docs, powering off a standard node does **not** stop billing.

### Committed

Some nodes can be launched or converted to a committed plan. Common behaviors include:

- lower cost than hourly for the same period
- upfront cost handling for committed periods
- post-period behavior controlled by settings:
  - auto-renew
  - switch to hourly billing
  - auto-terminate

See [E1 and committed billing use case](../use-cases/optimize-costs-with-e1-or-committed.md).

### E1 series special behavior

E1 series nodes are documented separately and behave differently in important ways:

- compute billing pauses when the node is stopped
- storage and attached resources continue billing
- public IP is optional and not attached by default
- root storage must be chosen explicitly
- plan changes happen while powered off

Do not assume E1 behavior applies to all node families.

## E1 Series: IOPS calculation

IOPS (Input/Output Operations Per Second) represents the number of read and write operations a storage system can perform in one second. For E1 series, IOPS scales with root disk storage.

### Formula

**New IOPS Value = Old IOPS Value + (Change in Root Disk Storage × 5)**

### Example

For a root storage size of 150 GB:
- Read IOPS = 15000
- Write IOPS = 10000

When increasing root storage to 250 GB:
- Change in storage = 250 GB - 150 GB = 100 GB
- Increment in IOPS = 100 × 5 = 500
- New Read IOPS = 15000 + 500 = 15500
- New Write IOPS = 10000 + 500 = 10500

### Summary table

| Root Storage (GB) | Read IOPS | Write IOPS |
|-------------------|-----------|------------|
| 150               | 15000     | 10000      |
| 200               | 15250     | 10250      |
| 250               | 15500     | 10500      |
| 300               | 15750     | 10750      |

## E1 Series: Root storage options

- Default root storage: 150 GB
- Minimum: 75 GB
- Maximum: 2400 GB
- Storage increase increments:
  - Below 150 GB: 25 GB steps (75, 100, 125, 150 GB)
  - Above 150 GB: 50 GB steps (150, 200, 250, 300 GB, etc.)

:::tip
Root storage size can be increased after launch, but not decreased.
:::

## Network performance

### E1 Series

- Private Network: Up to 100 Gbps throughput
- Public Network (when public IP attached): Up to 10 Gbps throughput

## Saved image and snapshot billing notes

Billing notes:

- saved images are billed by disk space used
- snapshots use incremental billing
- if a new snapshot adds `0 GB` of incremental data, it produces no billed usage for that snapshot

## Practical decision guide

Choose:

- `standard hourly node` if you want the simplest start
- `committed node` if you know the node lifetime in advance and want lower cost
- `E1 series` if optional public IPs and stop-sensitive compute billing matter to you
- `marketplace image` if you want a faster app setup than building from a base OS
- `saved image` if you need repeatable internal environments

## Related reading

- [Quickstart](../getting-started/quickstart.md)
- [Daily operations](../guides/daily-operations.md)
- [Support matrix and limits](../reference/support-matrix-and-limits.md)
