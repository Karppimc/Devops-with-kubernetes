## Exercise 2.08: Project v1.2

1. ✅ Created a PostgreSQL Database Pod:
- Set up a StatefulSet for the database with persistent storage.
- Configured a Headless Service (todo-db-svc) for stable network identity.
2. 🔑 Managed Secrets Securely:
- Stored database credentials (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB) using Kubernetes Secrets.
3. ⚙️ Backend Integration:
- Updated server.js to connect to the database using environment variables.
- Enabled GET /todos and POST /todos endpoints to interact with the database.
4. 🐳 Built and Pushed Docker Image:
- Rebuilt the todo-backend image with database integration.
- Pushed to Docker Hub as karppimc/todo-backend:latest.
5. 🚀 Deployed Backend in Kubernetes:
- Used ConfigMap and Secret for environment configuration.
- Verified communication with the database.
6. 🔄 Testing:
- Successfully added and fetched TODOs via HTTP endpoints.
7. 🛡️ Persistent Storage:
- Ensured database data persists across pod restarts using PersistentVolumes.