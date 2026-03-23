# Monitoring And Alerts

This guide helps you move from passive node ownership to active operational visibility.

## Outcome

You will know how to:

- read the main node graphs
- create alerts
- pause or resume alerts
- recover when monitoring data is missing

## What monitoring covers

Monitoring graphs cover:

- disk space
- memory usage
- CPU load
- CPU utilization
- disk read operations
- disk write operations
- disk utilization
- memory utilization

Monitoring graphs are available from the node's `Monitoring` tab.

## Understanding monitoring metrics

### CPU Load

CPU Load expresses how many processes are waiting in the queue to access the computer processor. It can vary according to the type and amount of computing task because some tasks require substantial CPU time which causes slow performance, errors, and increased load while others require less CPU time.

### CPU Utilization

CPU Utilization indicates the percentage of total processing power currently in use by your resource. It helps assess how efficiently the CPU is being used and can reveal performance bottlenecks caused by high or consistently maxed-out usage.

### Disk Operations

- **Disk Read Operation**: Monitor the IOPS of disk read operations on your resource
- **Disk Write Operation**: Monitor the IOPS of disk write operations on your resource
- **Disk Utilization**: Monitor the overall disk utilization, indicating the percentage of time the disk is actively processing read or write operations

### Memory

- **Memory Usage**: Monitor the overall used and free RAM
- **Memory Utilization**: Shows the percentage of RAM currently in use. High memory usage may indicate resource-intensive applications or processes running on the system.

## What alerts can trigger on

Alert trigger types include:

- **Processor Load**: Set the processor load threshold value (recommended: higher than 10)
- **Consumed Memory**: Set the memory utilization level (recommended: less than 15%)
- **Percentage Free Disk Space**: Set the disk space utilization level (recommended: less than 15%)
- **Web Check**: A web URL monitoring tool that creates alerts on:
  - **Success Code 200**: The request was fulfilled
  - **Text Match**: Crawls a given URL and verifies text; notifications are sent if differences from the standard text are detected
  - Maximum 5 URLs per node
- **Volume Read Ops**: Monitors the number of read operations on a storage volume
- **Volume Write Ops**: Tracks the number of write operations on a storage volume

### Trigger Operators

You can configure alerts to trigger based on different conditions:

- Higher than threshold
- Less than threshold
- Equal to threshold
- Not equal to threshold

### Alert Severity Levels

Configure severity levels to prioritize alerts:

- Informational
- Warning
- Average
- High
- Disaster

Newly created nodes may receive default server health alerts with recommended parameters.

## Create a node alert

1. Open the node details page.
2. Open the `Alerts` tab.
3. Click **Create Alert**.
4. Choose:
   - trigger type
   - operator
   - threshold
   - severity
   - user group
5. Save the alert.

## Create and manage user groups

User groups allow you to organize who receives alert notifications.

### Create a user group

1. While setting up an alert, click the **'+'** button to create a new user group.
2. Enter the group name.
3. Click the **'Select'** button to add users.
4. Select users from the list and click **'Add'** to include them.
5. Click the **'Create'** button to finalize the user group.

## Pause and resume alerts

Pause an alert when you have planned maintenance or known noisy conditions. Resume it when the node returns to normal operation.

Pause and resume actions:

- does not delete the alert
- only stops or restarts the trigger behavior

### Pause an alert

1. Go to the **Node → Alerts** tab.
2. In the **Actions** column, click the pause icon for the alert you wish to pause.
3. A confirmation popup will appear explaining that this will stop the trigger across all configured user groups.
4. Click **Pause** to confirm.

The alert status will reflect the paused state. No notifications will be sent while the alert is paused.

### Resume an alert

1. In the **Node → Alerts** tab, find the paused alert you want to re-enable.
2. Click the resume icon under the **Actions** column.
3. A confirmation popup will appear.
4. Click **Resume** to re-enable the alert.

The alert will now be active and start triggering based on the configured conditions.

## Troubleshooting missing monitoring data

Monitoring is preconfigured and should usually show data within 5 to 10 minutes after launch.

If it does not:

1. verify the Zabbix agent is running
2. check whether port `10050` is allowed
3. reinstall or reconnect the agent if the image was imported or manually modified

## Example Linux checks

```bash
service zabbix-agent status
systemctl status zabbix-agent
```

## Important caveat

Some older source material includes a hardcoded monitoring server IP `172.16.103.23` for agent configuration. Treat that value as environment-specific unless it is confirmed in your current E2E account or support guidance.

## Related guides

- [Daily operations](daily-operations.md)
- [Monitoring and site issues](../troubleshooting/monitoring-and-site-issues.md)
