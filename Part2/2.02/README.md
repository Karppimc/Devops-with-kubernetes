## 2.02

1. Created a todo-backend service for managing TODOs.
2. Exposed it through Kubernetes service (todo-backend-svc) on port 3005.
3. Configured Ingress for:
- / → todo-service (3006)
- /todos → todo-backend-svc (3005)
4. Ensured proper communication between todo-app and todo-backend.
5. Validated communication using curl commands and Ingress routing.