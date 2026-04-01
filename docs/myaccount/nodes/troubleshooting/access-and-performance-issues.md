---
title: Access And Performance Issues
description: Troubleshoot access, latency, and performance issues for MyAccount Nodes
---

# Access And Performance Issues

This guide covers the problems most likely to stop you from using the node at all: no access, slowness, high CPU, or full disk.

## When to use it

Use this guide if:

- SSH or RDP fails
- the node looks hung
- the site is slow because the server is unhealthy
- disk usage is near full

## 1. Check whether the node is up

Test network reachability:

```bash
ping SERVER_IP
```

For Linux:

```bash
ssh username@SERVER_IP
```

For Windows from Linux:

```bash
rdesktop SERVER_IP -u username -p password
```

Also check the node state in MyAccount and confirm it is actually running.

### Understanding ping results

If ping succeeds with low latency, your server is reachable at the network layer:

```bash
ping xx.xx.xx.xx
# Output shows packets transmitted, received, with latency values
```

If ping shows 100% packet loss, the server may be down or unreachable:

```bash
ping xx.xx.xx.xx
# Output shows 100% packet loss
```

:::note
Some servers disable ICMP ping for security, so a failed ping does not necessarily mean the server is down.
:::

## 2. Reboot if the node is unresponsive

Use the portal reboot action when the machine may be out of memory or otherwise hung, then wait for the node to return.

## 3. Use console access

Console access is the fallback when:

- SSH or RDP is blocked
- firewall changes broke connectivity
- network settings were misconfigured
- the machine is hung and you need direct visibility

## 4. Check CPU and memory pressure

Useful commands from the source troubleshooting pages:

```bash
uptime
top
ps -ef | grep mysql
```

The `uptime` command shows system load averages over 1, 5, and 15 minutes. High load averages indicate many processes are waiting for CPU time.

If a process is the problem:

```bash
pkill processname
kill -9 PID
```

Use care with process termination on production systems.

### Common causes of high CPU

- Incorrect service level configuration (multiple processes of the same service)
- Inadequate server resources for the workload
- Poorly configured applications (e.g., backup processes running at peak times)
- Concurrent cron jobs scheduled at the same time

## 5. Check disk usage

If disk usage approaches 99%, the node may become inaccessible or even power off.

Useful commands:

```bash
df -h
du -sh /path/*
lsof | grep "(deleted)"
ncdu /
```

### Common causes of disk full

- Growing logs in `/var/log`
- Retained backup files
- Temporary files in `/var/tmp`
- Deleted-but-still-open files (shown by `lsof | grep "(deleted)"`)

### Using ncdu for disk analysis

`ncdu` (NCurses Disk Usage) provides an interactive interface to find large files:

```bash
# Install on RHEL/CentOS
yum install ncdu

# Install on Ubuntu/Debian
sudo apt-get install ncdu

# Scan entire filesystem
ncdu /
```

## 6. Use recovery mode when normal access is gone

Recovery mode is available for supported Linux scenarios:

1. power off the node
2. enable recovery mode from Actions
3. start the node
4. open console
5. boot into rescue mode
6. mount the disk
7. repair issues such as full disk or password reset
8. power off again
9. disable recovery mode
10. boot normally

### Recovery mode use cases

- **Disk full**: When disk is completely full, recovery mode lets you mount the filesystem and delete unnecessary files. The root disk will be mounted at `/mnt/sysroot`.

- **Password reset**: If you need to reset the root password, mount the disk and modify the password files.

- **Firewall misconfiguration**: If firewall rules lock you out, recovery mode allows you to edit firewall configuration files.

## 7. Check firewall and network configuration

If you made changes to firewall or network configuration and lost connectivity:

1. Access the console via MyAccount
2. Review and revert the changes
3. If using CDP Backup, consider restoring from a backup

## 8. Network troubleshooting

For network issues beyond basic connectivity:

### Ping and traceroute

Test connectivity to external hosts:

```bash
# Ping test
ping 8.8.8.8 -c 100

# Traceroute
traceroute 8.8.8.8
```

If you can reach other sites but your server has issues, the problem may be server-side. If all sites show packet loss, it may be a local network issue.

### Check port accessibility

Verify required ports are open:

```bash
# Check HTTP (port 80)
telnet SERVER_IP 80

# Check HTTPS (port 443)
telnet SERVER_IP 443

# Check MySQL (port 3306)
telnet DATABASE_SERVER_IP 3306
```

## 9. If the problem is only the website

If the server itself is reachable, the problem may be at the service layer. Continue with [Monitoring and site issues](monitoring-and-site-issues.md).

### Service-level checks

Verify web server is running:

```bash
# Apache on Debian/Ubuntu
service apache2 status
service apache2 restart

# Apache on CentOS/RHEL
service httpd status
service httpd restart

# Nginx
service nginx status
service nginx restart
```

### Check configuration syntax

```bash
# Apache
apache2ctl -t
# or
httpd -t

# Nginx
nginx -t
```

### Verify database connectivity

```bash
# MySQL
mysql -hDB_HOST -uDB_USER -pDB_PASSWORD

# Check MySQL is listening
netstat -ntlp | grep mysql
```

## Related guides

- [Connect to your node](../guides/connect-to-your-node.md)
- [Daily operations](../guides/daily-operations.md)
