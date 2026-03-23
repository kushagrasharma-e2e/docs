---
title: DNS Migration Troubleshooting
description: Troubleshooting, FAQ & Post-Migration Checklist
---

## Email Continuity

If MX records are not copied before nameserver change:

Email will fail.

### Technical Impact

When nameservers change:

* DNS authority changes.
* Old zone file is ignored.
* Only the records present in the E2E zone will answer after cutover.

If no valid MX record exists in the new zone, receiving systems no longer have a valid destination for mail for that domain, so delivery can fail or be deferred. See [Google Workspace guidance on MX records](https://support.google.com/a/answer/140034).

---

### Email Protection Protocol

Before nameserver switch:

* Copy MX records
* Copy SPF TXT
* Copy DKIM TXT
* Copy DMARC TXT

SPF (Sender Policy Framework) tells recipient servers which IPs are authorized to send mail. [Without a valid SPF record](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/), your mail is likely to land in spam folders.

---

## Common Troubleshooting

### 1. "I Still See My Old Website"

**Cause:**
Local DNS cache or ISP caching.

**Fix:**

Windows:

```bash
ipconfig /flushdns
```

Mac:

```bash
sudo dscacheutil -flushcache
```

Alternatively, verify the global state using a [DNS Checker](https://www.whatsmydns.net/).

---

### 2. SSL Certificate Issues

If using Let’s Encrypt:

* Re-issue the certificate on the E2E server.
* Ensure port 80 is open for [HTTP-01 challenges](https://letsencrypt.org/docs/challenge-types/).
* Confirm DNS resolves correctly to the E2E IP before issuing.

SSL validates domain ownership via DNS. If DNS points to the old server, the certificate validation will fail.

---

### 3. Reverse DNS (PTR)

If sending email directly from an E2E server:

You must [configure a PTR record](https://docs.e2enetworks.com/docs/myaccount/network/dns/#how-does-reverse-dns-work). Without a PTR record that matches your Forward DNS (A record), major providers like Gmail and Outlook often [reject mail to prevent spam](https://mxtoolbox.com/problem/smtp/smtp-reverse-dns-resolution).

Set PTR inside the E2E dashboard under: **Network → Reverse DNS**.

---

## FAQ

### Will my site go down?

If:

* TTL was reduced 24 hours prior.
* Records were replicated accurately.
* The A-record points to the correct E2E IP.

Then no. If you skip record replication, the site will become unreachable once the GoDaddy nameservers stop responding to queries.

### Do I need to transfer domain ownership?

No. Domain registration and DNS hosting are separate functions. You can keep the domain registered at GoDaddy while moving DNS authority to E2E by changing nameservers.

### Why is propagation inconsistent?

* ISPs (Internet Service Providers) cache records based on their own internal policies.
* The previous TTL may not have expired yet.
* Local browser or OS caches may persist.

---

## Post-Migration Checklist

* [ ] Nameservers show the E2E values from your DNS dashboard
* [ ] Website loads from E2E Public IP
* [ ] MX records verified via `dig MX`
* [ ] SPF/DKIM/DMARC validated
* [ ] SSL certificate active and valid
* [ ] Reverse DNS (PTR) configured (if applicable)
* [ ] Uptime monitoring enabled

---
