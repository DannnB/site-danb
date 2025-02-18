---
title: 'PM2: Large log files and how to remove them'
datetime: 2020-04-23
image:
  url: 
  alt:

alt: A quick one on a PM2 logging management issue I fell into with large files
description: A quick one on a PM2 logging management issue I fell into with large files
tags: ['pm2', 'nodejs', 'javascript']
show: true
---

# PM2 - Large log files and how to remove them

## A quick one on a PM2 logging management issue I fell into with large files.

By default, PM2 can create logs. Now if you are working with a production app which goes live and you haven’t sorted out log rotation then there could be a big problem

PM2 for Node is great, read more it here: [PM2 for Node](https://pm2.keymetrics.io/)

I left the default logging on and on a production app there was an error, it took up about 10 lines for each one. After several days there was a problem with disk space on the server. It was a 40GB server, and there was a PM2 log file that was over 30GB in size!

`du -h ~/.pm2/pm2.log`

Now, this was a problem I never had to deal with these logs before.

The server was full and I went into a “delete” it mode by simply using:

```
// DANGER: DONT DO THIS!  
rm ~/.pm2/pm2.log  
reboot  
// DANGER: DONT DO THIS!
```

Now, this didn’t work because the PM2 process and node were still holding onto that file. So you would have to reboot the server or restart each process using it (was over 15).

So after a bit more reading, I found the [PM2 documentation for logging](https://pm2.keymetrics.io/docs/usage/log-management/).

`pm2 flush`

Now, this cleared the files in **~/.pm2/logs** and the **~/.pm2/pm2.log** file that quickly caught up in size after the initial delete.

If you want you can **reboot** after flushing pm2 logs.  
This method fixed the issue of the file still taking up space because it was used by all those processes.  
At this stage, I learned about a simple concept of “log rotation”.

PM2 has a module that makes this as simple as a couple of commands to do:

`pm2 install pm2-logrotate`

After this, you can set what you want to happen to those log files.  
This work for me for my needs:

```
pm2 set pm2-logrotate:max_size 50M  
pm2 set pm2-logrotate:retain 10  
pm2 set pm2-logrotate:compress true
```

If you mess up, the default PM2 settings (as of 2020/01/23) are:

```
pm2 set pm2-logrotate:retain 30  
pm2 set pm2-logrotate:compress false  
pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss  
pm2 set pm2-logrotate:max_size 10M  
pm2 set pm2-logrotate:rotateInterval 0 0 * * *  
pm2 set pm2-logrotate:rotateModule true  
pm2 set pm2-logrotate:workerInterval 30
```

This should separate the log files, limit their size and delete them when needed.

Let me know in the comments if this helped you out!
