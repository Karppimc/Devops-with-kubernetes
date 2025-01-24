# 📚 Exercise 4.01: Readiness Probe Implementation
1. What was done
- Implemented ReadinessProbes for the Ping-pong and Log-output applications.
- Ensured the probes dynamically determine readiness based on application dependencies.
- Configured the environment to simulate scenarios with and without the database to validate the probes.
- Verified system behavior matches the requirements before and after the database StatefulSet was scaled.
2. Pingpong
- The ReadinessProbe checks connectivity to the PostgreSQL database.
- Uses the pg_isready command to verify if the database is accessible.
- Ping-pong is marked as READY only when the database connection is established.
3. Log-output
- The ReadinessProbe ensures Log-output can communicate with the Ping-pong application.
- Uses a curl command to ping the /healthz endpoint of Ping-pong.
- Log-output is marked as READY only when Ping-pong is available.

4. Test scenarios:
Without db:
- Ping-pong enters READY 0/1 due to the database being unavailable.
- Log-output eventually transitions to READY 0/1 as it cannot communicate with Ping-pong.

With db:
- Ping-pong transitions to READY 1/1 upon reconnecting to the database.
- Log-output transitions to READY 1/1 after verifying Ping-pong availability.



