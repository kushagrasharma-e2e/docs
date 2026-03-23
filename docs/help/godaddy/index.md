---
title: DNS Migration to E2E
description: What changes when you move DNS management from GoDaddy to E2E Networks
---

## What this migration changes

This is a DNS-management migration, not necessarily a domain-transfer project.

If you update nameservers:

- your domain can remain registered with GoDaddy
- DNS authority moves to E2E
- your website, mail, and other services continue working only if the required records are recreated correctly in E2E first

That separation between registrar and DNS hosting is a normal setup and is supported by GoDaddy's nameserver workflow.

---

## What E2E DNS supports
The public E2E documentation covers these DNS-related capabilities:

- domain and record management in DNS Hub
- reverse DNS (PTR) configuration
- DNS workflows that sit alongside reserved IP and load balancer operations

Useful starting points:

- [E2E DNS documentation](https://docs.e2enetworks.com/docs/myaccount/network/dns/)
- [E2E Application Load Balancer documentation](https://docs.e2enetworks.com/docs/myaccount/appliance/Application-Load-Balancer/)

---

## When E2E DNS is a good fit

Use E2E DNS when you want to manage records close to the rest of your E2E infrastructure operations, such as:

- pointing services at E2E public IPs
- keeping reverse DNS in the same operational surface
- managing load balancer and networking changes alongside DNS updates

This guide avoids unsupported claims about network topology, latency, or DNS architecture that are not described in the public product documentation.

---

## Safe migration pattern

For most teams, the safe pattern is:

1. Export the existing GoDaddy zone.
2. Recreate the required records in E2E DNS.
3. Verify the new zone carefully.
4. Change nameservers at GoDaddy only after the new zone is ready.
5. Re-test web, mail, and any third-party integrations during propagation.

The biggest operational risk is incomplete or incorrect record replication before cutover.

---

## What stays the same

Changing nameservers does not automatically change:

- who the registrar is
- which mail provider you use
- what origin IP or load balancer your records should target

Those values still need to be reviewed service by service.

---

## Continue with the task guides

- [Migrate from GoDaddy](migrate.md)
- [DNS migration troubleshooting](troubleshoot.md)
