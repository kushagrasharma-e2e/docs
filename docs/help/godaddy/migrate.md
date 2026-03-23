---
title: Migrate from GoDaddy
description: Step-by-Step Migration – Zero-Downtime Blueprint
---

## Phase 1: Discovery – Audit Everything

Before touching anything, inventory your DNS zone.

### Step 1: Export Records from GoDaddy

Log into GoDaddy:

- Go to DNS Management
- [Export Zone File](https://www.godaddy.com/help/export-my-dns-records-4166)

Copy all:

- A records
- AAAA records
- CNAME records
- MX records
- TXT records (SPF, DKIM, DMARC)
- SRV records (if any)

---

### Step 2: Use dig to Detect Hidden Records

Sometimes records are overlooked, especially mail and validation records.

Use targeted lookups instead of `ANY`, because modern authoritative servers may return minimal or incomplete results for `QTYPE=ANY`.

Run:

```bash
dig example.com A
dig example.com AAAA
dig example.com CNAME
dig example.com MX
dig example.com TXT
dig example.com SRV
dig example.com CAA
```

Or:

```bash
nslookup -type=mx example.com
```

**Why this matters:**
TXT records control SPF validation. [Missing or incorrect SPF records](https://support.google.com/a/answer/10685032) lead to emails being flagged as spam or rejected by receiving servers.

---

## Phase 2: The IP Translation Logic

This is where customers panic.

They ask:
“Where do I put the GoDaddy IP?”

You don’t.

### Concept Clarification

| Component       | Old World (GoDaddy)   | New World (E2E) |
| --------------- | --------------------- | --------------- |
| Website Hosting | GoDaddy shared IP     | E2E Public IP   |
| DNS Manager     | GoDaddy DNS           | E2E DNS         |
| Email Server    | Microsoft/Zoho/Google | Same provider   |

### The Rule

- Website A-record → Point to E2E Public IP
- **Do NOT** copy GoDaddy’s hosting IP
- MX → Copy exactly as-is
- TXT → Copy exactly as-is

---

### Where Do I Put the IP?

You:

1. Get the public IPv4 from the node details page in E2E MyAccount.
2. Create the A record in [E2E DNS Hub](https://docs.e2enetworks.com/docs/myaccount/network/dns/).
3. Set @ → E2E Public IP.

That’s it.

Unless you run external mail — then MX stays unchanged.

---

## Phase 3: The TTL Trick

TTL = Time To Live.

It controls how long DNS resolvers cache your records.

### 24 Hours Before Migration

Lower TTL in GoDaddy to:

**300–600 seconds**

This can reduce how long older answers remain cached:

- Faster propagation
- Shorter recovery time if you need to correct a record

**Warning:** If [TTL is 86400 seconds](https://www.cloudflare.com/learning/dns/dns-records/dns-ttl/) (24 hours), propagation and recovery from errors can take a full day.

---

## Phase 4: Nameserver Cutover

After verifying all records exist in E2E:

1. Login to GoDaddy.
2. Go to [Domain Settings](https://www.godaddy.com/help/edit-my-domain-nameservers-664).
3. Select “I'll use my own nameservers” or “Custom Nameservers.”
4. Enter the E2E nameservers shown for your domain in the E2E DNS dashboard.

Save changes.

**Propagation time:**

- 5 minutes to 24 hours
- Usually under 1 hour with reduced TTL

---

## Validation Checklist

After propagation, verify using [Global DNS Propagation tools](https://www.whatsmydns.net/) or command line:

```bash
dig NS example.com
dig A example.com
dig MX example.com
```

Ensure:

- Nameservers show the E2E values from your DNS dashboard.
- A record shows E2E IP.
- MX records remain unchanged.

If those checks pass, the domain should cut over without requiring a registrar transfer. Keep your exported zone snapshot until propagation settles.

---
