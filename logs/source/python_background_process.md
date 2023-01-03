% Handling Background tasks in UNIX 
% Abhiram Mullapudi
% April 11, 2022


## Launching a background task

1. Create a shell script that monitors the task that is running and restarts it if it dies.

```shell
#!bin/bash
until <python python_scipt.py>; do
	echo "script died with error #?. Restarting it" >&2
	sleep 1
done
```

2. Launch it with nohup
```shell
nohup <path to your shell script> &
```


## How to kill a running background task

1. Determine the PID of running job

```shell
ps -aux | grep <script name>
```
This should return the PID associated with the script running in the system.

2. Kill the job

```
kill -9 <PID of the job to kill>
```
