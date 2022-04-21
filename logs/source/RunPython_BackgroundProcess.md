% Data Pipelines
% Abhiram Mullapudi
% March 22, 2022

# Data pipelines

We are often asked to build data pipes that route data from one source to the other. 
Like everything in life, we can approach the design of data pipelines in multiple ways.
Data pipelines can be abstracted in multiple ways: by the types of databases they are are interfacing with, the type of hardware it is running on or the language it is developed in, etc.
I personally believe an abstraction based on how the data pipeline is moving data is the best way to think about these data pipes.
By moving data, I specifically mean the frequency with which we are receiving and pushing data. 

Any data pipe has three components 
1. Data Ingestion
2. Data Processing
3. Data Transmission

Usually this can be thought of as a state machine




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
