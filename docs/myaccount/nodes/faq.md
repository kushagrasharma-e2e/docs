---
title: FAQ & Troubleshooting
sidebar_label: FAQ
---

This page covers the most common issues teams hit when running workloads on E2E.

---

## Billing & lifecycle

**Q: I powered off my Node. Why am I still being billed?**  
Powering off does not stop billing. The resources are still reserved for you.  
To stop billing, you must **Terminate** the Node.

**Q: Can I pause Nodes and resume later without paying?**  
No. Treat Nodes like reserved capacity. If you don’t need it, terminate it and recreate later from an Image.

---

## Connectivity

**Q: I can’t SSH into my Node.**  
Check:

- The Node has a public IP
- Port 22 is allowed in firewall/security rules
- Your SSH key was attached at creation
- You’re using the correct username (`root` is most common)

**Q: My app runs locally but isn’t reachable from the internet.**  
Common causes:

- App bound to `127.0.0.1` instead of `0.0.0.0`
- Firewall blocking the port
- Load balancer health checks failing

---

## Images & snapshots

**Q: My image creation failed.**  
Make sure the Node is powered off before saving an Image (especially for Windows images).

**Q: Should I use snapshots for scaling?**  
No. Snapshots are for recovery. Use Images for scaling and repeatable environments.

---

## Scaling

**Q: Traffic spikes are taking down my single VM.**  
You’ve hit the ceiling of vertical scaling.  
Move to:

- Load balancer
- Scale Group
- Stateless app design

**Q: My scale group launches broken Nodes.**  
Your golden image is broken. Fix the image, not the auto-scaler.

---

## Monitoring

**Q: The Node is up but users see errors.**  
Infrastructure health != application health.  
Add:

- App health checks
- HTTP error monitoring
- Log aggregation

---

## Backups & recovery

**Q: I restored a snapshot but data is missing.**  
If data lived on ephemeral disk, it’s gone.  
Critical data should live on:

- Attached volumes
- External databases
- Object storage

---

## API & automation

**Q: API calls sometimes fail.**  
Handle:

- 4xx → fix your request
- 5xx → retry with backoff

Always add retries and backoff to automation.

---

## Operational hygiene

**Q: Our infra drifted and nobody knows why.**  
Use:

- Images for repeatability
- API/Terraform for changes
- Audit logs to track mutations

Manual production changes are a common source of drift and avoidable outages.

---

## Still stuck?

If you can’t find the issue here:

- Check Audit Logs in MyAccount
- Inspect Node boot logs
- Verify security group and network rules
- Confirm image version used

If all else fails, document the incident so the same failure is easier to diagnose next time.

---
