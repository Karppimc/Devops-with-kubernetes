# 📚 Exercise 3.09
1. Set resource limits
- Added resources requests and limits to both log-output and pingpong deployments
- Ensured CPU and memory usage were constrained to reasonable limits
- Requests: Minimum guaranteed resources.
- Limits: Maximum resources a container can use.
2. Applied updates
- Updated and applied the deployment.yaml files for both applications.
- Verified that the updated pods are running in the app-space namespace.
3. Monitored resource usage
- Used kubectl top pods to monitor CPU and memory usage.
- log-output: Low resource consumption.
- pingpong: Moderate CPU usage, reflecting its workload.

- Both applications run within specified resource limits as expected.



