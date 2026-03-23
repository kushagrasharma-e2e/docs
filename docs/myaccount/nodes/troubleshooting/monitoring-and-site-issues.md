# Monitoring And Site Issues

This guide helps when the node exists, but the service on it is unhealthy or the monitoring view is incomplete.

## 1. Monitoring graphs are missing

Monitoring data should usually appear within 5 to 10 minutes after launch.

If it does not:

1. check the Zabbix agent status
2. confirm port `10050` is allowed
3. reinstall or reconnect the agent if the image was imported or modified

Example checks:

```bash
service zabbix-agent status
systemctl status zabbix-agent
```

## 2. Web check or site-down alert fired

When a web check or site-down alert fires, check in this order:

1. is the server itself reachable?
2. are CPU, memory, or disk resources exhausted?
3. what do the web server logs say?
4. is the web server service actually running?
5. is the web server configuration valid?
6. is the database reachable?
7. are required ports open?
8. is DNS correct?

### Understanding web check alerts

Web check alerts trigger when:

- The site is DOWN
- The site loads very slow (more than 60 seconds, depending on Timeout setting)

## 3. Check logs

Common log paths:

```bash
# Apache on Debian/Ubuntu
/var/log/apache2/

# Apache on CentOS/RHEL
/var/log/httpd/

# Nginx
/var/log/nginx/access.log
/var/log/nginx/error.log
/var/log/nginx/nginx_error.log
/var/log/nginx/access_error.log
```

Useful commands:

```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/httpd.log
less /var/log/nginx/access.log
```

## 4. Check web server service state

Common service commands:

```bash
# Nginx
service nginx start
service nginx stop
service nginx restart
service nginx reload
service nginx status

# Apache on Debian/Ubuntu
service apache2 start
service apache2 stop
service apache2 restart
service apache2 reload
service apache2 status

# Apache on CentOS/RHEL
service httpd start
service httpd stop
service httpd restart
service httpd reload
service httpd status
```

## 5. Verify web server configuration syntax

If your web server is failing to start, there may be an issue with your configuration file.

```bash
# Apache on Debian/Ubuntu
apache2ctl -t

# Apache on CentOS/RHEL
httpd -t

# Nginx
nginx -t
```

A "Syntax OK" or "test is successful" message means the configuration is valid. If you get "test failed", there are invalid arguments in the configuration file that need correction.

## 6. Verify database connectivity

If your site connects to a database (MySQL, PostgreSQL, MongoDB), verify it's running:

```bash
# MySQL
service mysql status
service mysqld status

# MongoDB
service mongod status

# Check if MySQL is listening
netstat -ntlp | grep mysql
```

For database connection testing:

```bash
mysql -hDB_HOST -uDB_USER -pDB_PASSWORD
```

For application-specific configs (e.g., WordPress), check the configuration file for correct DB_NAME, DB_USER, and DB_PASSWORD.

## 7. Check port accessibility

Web servers run on port 80 for HTTP and port 443 for HTTPS. Database servers typically run on port 3306 (MySQL).

```bash
# Check HTTP
telnet SERVER_IP 80

# Check HTTPS
telnet SERVER_IP 443

# Check MySQL
telnet DATABASE_SERVER_IP 3306
```

If ports are not accessible, check your firewall configuration.

## 8. Verify DNS settings

If you can access the site with IP but not with your domain name, check DNS settings:

```bash
dig A example.com +short
```

The output should show your server's IP address. Also check your Apache virtual host files or Nginx server block files to ensure they are configured to respond to requests for your domain.

## 9. Compare network quality

For suspected network issues, run parallel `ping` and `traceroute` tests to:

- your server
- a stable external target such as `8.8.8.8`

Example:

```bash
ping 8.8.8.8 -c 100
traceroute 8.8.8.8
```

If you see packet losses to external sites, it may be a local network issue. If only your server shows packet loss, it could be a server or network issue.

## Related guides

- [Monitoring and alerts](../guides/monitoring-and-alerts.md)
- [Access and performance issues](access-and-performance-issues.md)
