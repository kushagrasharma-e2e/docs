# Windows And Active Directory

This guide helps Windows users get to a usable server and points to the documented AD workflow.

## Outcome

You will know how to:

- connect to a Windows node
- promote a Windows Server to a domain controller
- join client machines to the domain

## When to use it

Use this guide if:

- you launched a Windows node
- you need RDP access
- you want to promote a server to a domain controller

## Connect to the Windows node

### From Windows

Use Remote Desktop:

1. open `mstsc`
2. enter the server IP or hostname
3. connect as `Administrator` or the account provided for the node

### From Linux

If `rdesktop` is installed:

```bash
rdesktop SERVER_IP
```

### From macOS

Use Microsoft Remote Desktop and configure:

- PC name
- username, commonly `Administrator`
- password

For the full access flow, see [Connect to your node](connect-to-your-node.md).

## Promote a server to a domain controller

Follow these steps to set up Active Directory Domain Services on your Windows Server.

### Step 1: Open Server Manager

Launch Server Manager. Look for a yellow triangle warning sign near the menu bar, indicating that Active Directory Domain Services was installed.

### Step 2: Access Post-Deployment Configuration

Click on the warning sign. A dropdown list with required actions ("post-deployment configuration") will appear.

### Step 3: Choose "Promote this Server"

Look for the option "Promote this server to a domain controller". Click on it to initiate the promotion process.

### Step 4: Deployment Configuration

The configuration wizard will guide you through the setup:

1. **Select "Add a New Forest"**: Choose the radio button labeled "Add a new forest"
2. **Enter Root Domain Name**: Input your desired root domain name (e.g., example.com)
3. Click **Next** to proceed

### Step 5: Domain Controller Options

1. Leave settings as they are by default
2. **Set and Confirm Password**: Enter your desired Directory Services Restore Mode (DSRM) password
3. Remember to keep a note of this password

:::warning
The DSRM password is critical for recovery scenarios. Losing this password can make domain recovery difficult.
:::

### Step 6: DNS Options

1. You may encounter an error message stating there's no parent zone found
2. Click **Next** to disregard the error and proceed
3. Leave settings unchanged

### Step 7: Additional Options

Enter your desired NetBIOS domain name in the textbox and click **Next**.

### Step 8: Review Paths

Three or more paths will be listed. Do not change these paths. Click **Next**.

### Step 9: Review Your Selections

1. Check all selected options
2. Use the **Previous** button if changes are necessary
3. Once satisfied, click **Next**

### Step 10: Prerequisites Check

1. Navigate to the "Prerequisites Check" checkpoint
2. Verify all prerequisite checks completed successfully
3. If errors are present, fix them at the stated checkpoint
4. Once errors are fixed, a green check mark with a success message will be displayed

### Step 11: Install

Click the **Install** button to commence the installation.

:::info
The server will need to be restarted once the promotion is successfully complete.
:::

Congratulations! You have successfully set up Active Directory on your Windows Server.

## Connect a client server to the domain controller

After promoting your server to a domain controller, follow these steps to join client machines:

### On the client machine

1. Navigate to **Start → Server Manager → Local Server**
2. Click on **WORKGROUP**
3. Click on **Change**
4. Enter the domain name that you created on the domain controller
5. Click **OK**
6. Provide credentials when prompted
7. Click **OK** and restart the computer

### Verify on the domain controller

1. Navigate to **Server Manager → Tools → Active Directory Users and Computers**
2. Expand your domain
3. Look for the client computer in the **Computers** container

### Verify on the client machine

1. Access the client machine
2. Navigate to **Network & Internet settings**
3. The machine should now show as connected to the domain

## Practical caution

The AD page is procedural, but it does not fully explain prerequisites such as role installation state, DNS design, or production hardening. Use it as a portal-side walkthrough, not a complete AD architecture guide.

## Related guides

- [Connect to your node](connect-to-your-node.md)
- [Windows AD use case](../use-cases/run-a-windows-domain-controller.md)
- [FAQ](/docs/myaccount/nodes/faq)
