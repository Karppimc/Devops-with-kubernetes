## Exercise 2.09 - Daily Todos CronJob

- CronJob Created: Runs hourly (0 * * * *) to trigger a Bash script.
- Script Logic: Fetches a random Wikipedia article URL and posts it to the backend.
- Backend Integration: The task is added via the /todos endpoint of todo-backend-svc.
- Environment Variable: Backend URL is passed as TODO_BACKEND_URL.
- Ingress Configuration: /api/todos route exposed via NGINX Ingress.
- Automatic Scheduling Verified: CronJob triggers and completes successfully every hour.
- Validation Done: Tasks are visible via curl http://<INGRESS-IP>/api/todos
