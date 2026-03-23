# Optimize Costs With E1 Or Committed Billing

This use case helps you choose a billing model based on how you actually run the node.

## Good fit

Use this when:

- cost predictability matters
- your node is long-lived
- or your node is stopped often enough that E1 behavior may matter

## Option 1: committed billing

Choose committed billing when:

- you expect the node to stay in service for the full commitment period
- you want lower effective cost than hourly
- you can live with end-of-term settings such as auto-renew, hourly fallback, or auto-termination

In supported flows, you can also convert an hourly node to a committed node later.

## Option 2: E1 series

Choose E1 when these behaviors matter:

- compute billing pauses when the node is stopped
- public IP should be optional instead of automatic
- you want flexible root storage selection
- vertical plan changes while powered off are important

## Decision shortcut

- steady, predictable workloads: consider `committed`
- bursty or stop-heavy compute usage: consider `E1`
- first experiment with unknown shape: start `hourly`, then optimize later

## Caveat

This documentation does not include one complete availability matrix showing exactly which node families support which commitment options. Confirm plan-specific availability in the live product.

## Related guides

- [Node types and billing](../concepts/node-types-and-billing.md)
- [Daily operations](../guides/daily-operations.md)
- [Support matrix and limits](../reference/support-matrix-and-limits.md)
