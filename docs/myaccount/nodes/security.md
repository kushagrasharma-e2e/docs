---
title: Security & Hardening
sidebar_label: Security
---

This guide covers a minimum security baseline for running production workloads on E2E Nodes.

---

## Threat model

If your Node has a public IP:

- It is being scanned.
- It will be brute-forced.
- It will be probed for old vulnerabilities.

Security is about making these attempts routine and unsuccessful.

---

## 1) SSH access

### Use SSH keys only

- Upload SSH keys in **MyAccount → Profile → SSH Keys**
- Disable password authentication

```bash id="q6e4xw"
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

### Disable root login

```bash id="z4mx1c"
sudo sed -i 's/^#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

---

## 2) Network exposure

### Default stance: deny

Only open ports you actually use.

```bash id="39w71c"
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

If your app listens on a private port such as 3000 or 8000, put Nginx in front of it instead of exposing that port directly to the internet.

---

## 3) Public vs private nodes

- Prefer **private Nodes inside a VPC**.
- Put a load balancer or reverse proxy in front of them.
- Only the edge should have a public IP.

This shrinks your attack surface and simplifies operations.

---

## 4) OS updates

Unpatched servers create avoidable risk.

```bash id="j0f9d2"
sudo apt update && sudo apt upgrade -y
```

For production, enable unattended security upgrades:

```bash id="y0bb8p"
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

---

## 5) Host protection (BitNinja)

If your Node is internet-facing:

- Enable **BitNinja** from MyAccount

This provides:

- Intrusion detection
- Brute-force protection
- Malware scanning

It helps reduce a large amount of routine internet noise.

---

## 6) Secrets management

Never hardcode:

- API tokens
- Database passwords
- Private keys

Safer patterns:

- Environment variables injected at deploy time
- Secrets stored in a vault or CI secret store
- Files with restricted permissions (`chmod 600`)

---

## 7) Backups and disaster recovery

Security is also about surviving mistakes.

- Enable **Snapshots** before risky changes
- Use **CDP backups** for critical workloads
- Periodically test restore

If you have never tested a restore, treat backup readiness as unproven.

---

## 8) Audit logs and accountability

Use the **Audit Log** in MyAccount to track:

- Who created nodes
- Who deleted nodes
- Who changed networking or images

This helps during incidents and postmortems.

---

## 9) Minimal baseline checklist

Before calling something “production”:

- [ ] SSH keys only
- [ ] Firewall enabled
- [ ] Public ports limited
- [ ] OS auto-updates on
- [ ] Backups configured
- [ ] Audit logging reviewed

---

## What’s next

- Observe what’s happening: [Monitoring and alerts](guides/monitoring-and-alerts.md)
- Plan growth: [Scaling & Clusters](../auto-scale/scaling.md)

---
