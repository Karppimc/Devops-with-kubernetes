## Exercise 4.04
### What was done:

1. Created an AnalysisTemplate:
- Name: cpu-usage-rate
- Metrics: Monitored the CPU usage rate for all containers in the todo-space namespace.
- Query: Used a Prometheus query to calculate the CPU usage rate for all containers in the namespace.

2. CPU Usage Threshold:
- Set the success condition for the metric to be result <= 50 (in milliCPU), meaning the deployment will be allowed if the CPU usage stays below 50.
- Thefailure condition was set to result > 50, causing the rollback if the usage exceeds 50.

3.
- checked the CPU usage rate for all containers in the todo-space namespace. Measurements were taken every 20 seconds over a 10-minute period.
- theCPU usage remained within the acceptable range, so the deployment was successful and allowed to proceed.