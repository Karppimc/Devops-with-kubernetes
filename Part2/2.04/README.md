## 2.02

1. Created todo-space for the TODO project.
2. PersistentVolumes and PVCs
- Cleared bindings from todo-pv and image-pv.
- Rebound them to PVCs in todo-space.
3. Deployments:
- Restarted todo and todo-backend deployments to pick up updated PVCs and ensure correct image pulls.
4. Ingress:
- Configured Ingress rules to route / to todo-service and /todos to todo-backend-svc.
5. Testing:
- Validated endpoints with curl.
- Ensured both GET and POST operations on /todos are functional.