## Exercise 3.10
1. Create probes etc
- Configured for both todo and todo-backend deployments to check /healthz.
- Configured for todo-backend to ensure the container restarts if it becomes unresponsive.
- The /healthz endpoint was added to the application to return the necessary status for the probes.

2. Correct configs:
- All pods (todo, todo-backend, todo-db) are connected and in a Ready state when using the correct configuration.
3.
- Modified the POSTGRES_PASSWORD environment variable to simulate an incorrect database configuration.
- Verified that the new todo-backend pod failed to start due to the CreateContainerConfigError.
- The faulty pod was not marked as Ready, confirming the Readiness Probe works.


