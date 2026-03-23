# Support Matrix And Limits

This page gathers user-visible limits in one place.

## Snapshot support

Snapshot support is listed for:

- `C3`
- `M3`
- `SDC3`
- `E1`
- `WSDC4`

## VPC limits

Current documented VPC limits:

- up to 3 VPCs can be attached to one node
- up to 2 private IPs from a single VPC can be attached to one node

## Bulk action limit

- maximum 10 nodes at a time

## Custom image import limits

- supported formats: `qcow2`, `qed`, `raw`, `vdi`, `vhd`
- maximum disk size: `2048 GB`
- single disk partition expected

## Snapshot schedule time windows

- `12:00 AM - 01:00 AM`
- `08:00 AM - 09:00 AM`
- `06:00 PM - 07:00 PM`

## E1-specific limits and notes

- root storage range documented from `75 GB` to `2400 GB`
- default root storage documented as `150 GB`
- project transfer disabled
- root storage increase not allowed when the node is in `Stopped` state

## Export image region support

The export-image page documents support only for:

- Delhi -> Delhi
- Delhi -> Chennai

Export is unavailable in Chennai as a source region.

## Encryption-related limits

- encryption can only be enabled during node creation
- encryption cannot be disabled afterward
- saved-image behavior for encrypted nodes is limited
- export from images created from encrypted nodes is not available

## Known uncertainty

This is not a complete product matrix. A single authoritative table is not available here for:

- all plan families
- all committed-plan eligibility
- all resize rules
- all region combinations
