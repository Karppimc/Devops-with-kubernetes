## Exercise 3.03: Project v1.4

1. Set Up Workflow with GitHub Actions: Automated build, push, and deployment to Kubernetes using Kustomize.
2. Configured Database Pod: Fixed PostgreSQL initialization issues with proper PGDATA and subPath configuration.
3. Persistent Storage: Corrected PersistentVolumeClaims (image-pvc, todo-pvc, postgres-storage) with appropriate StorageClasses.
4. Secrets Management: Ensured database secrets (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB) were securely managed and loaded.

- Working workflow:
![Workflow](image.png)