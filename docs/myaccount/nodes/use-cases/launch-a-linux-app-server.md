# Launch A Linux App Server

This use case shows the shortest practical path to "I need a Linux server for an app or website."

## Good fit

Use this path if you need:

- a general-purpose Linux server
- SSH access
- optional monitoring and snapshots

## Suggested workflow

1. Launch a Linux node from MyAccount.
2. Add an SSH key but keep password login enabled until first access works.
3. Connect over SSH.
4. Install your app stack.
5. Turn on or review alerts for CPU, memory, disk, and web checks.
6. Take a snapshot or save an image after the server reaches a known-good state.

## Example commands after launch

```bash
ssh username@PUBLIC_IP
```

If you want to check basic health:

```bash
uptime
top
df -h
```

These commands match the troubleshooting patterns used elsewhere in this documentation.

## Why this is the default starting use case

This documentation is strongest around:

- Linux launch
- SSH access
- monitoring
- snapshots
- common web/server troubleshooting

That makes Linux app hosting the most straightforward first experience.

## Related guides

- [Create your first node](../guides/create-your-first-node.md)
- [Connect to your node](../guides/connect-to-your-node.md)
- [Monitoring and alerts](../guides/monitoring-and-alerts.md)
