# Assumptions And Gaps

This file records areas where the documentation is unclear, incomplete, or internally hard to reconcile.

## 1. Billing behavior is not uniform across node families

The general Manage Node docs say powering off a node does not stop billing. The E1 docs separately say compute billing pauses when the node is stopped. The rewritten docs treat E1 as a special case and avoid generalizing.

## 2. Snapshot support is explicit but narrow

The snapshot page explicitly names `C3`, `M3`, `SDC3`, `E1`, and `WSDC4`. Other pages talk about snapshots more generally. The rewritten docs keep the explicit list instead of implying universal support.

## 3. Committed-plan availability is not fully mapped

The documentation explains how committed billing works, but does not provide one authoritative table showing which node families and plans support it.

## 4. Backup and CDP setup is referenced, not fully explained here

Node pages mention backup and CDP backup details, but this folder does not fully document activation, policy design, recovery flow, or pricing for those features.

## 5. Encryption and image reuse have important caveats

The documentation says snapshots from encrypted nodes remain encrypted, but saved-image functionality does not preserve encryption in the same way. This is important and easy to misunderstand.

## 6. Image export coverage is region-limited in the docs

The export-image docs describe Delhi as the only source region and list Delhi-to-Delhi and Delhi-to-Chennai as supported. They do not provide a broader current region matrix.

## 7. Monitoring reconnection details may be environment-specific

The Zabbix-agent page uses the hardcoded IP `172.16.103.23`. The documentation does not clarify whether this is region-specific, universal, or still current.

## 8. Password and credential flows are spread across pages

The documentation mentions one-time passwords, emailed credentials, and a password retrieval link, but does not present one consolidated credential lifecycle for every node family.

## 9. Active Directory guidance is procedural, not architectural

The AD page shows the promotion sequence, but not the surrounding prerequisites, role installation context, backup strategy, or production hardening guidance.

## 10. API usage is mentioned but not documented in detail here

The documentation links to the E2E API but does not provide matching task-oriented API examples for the workflows covered in this folder.
