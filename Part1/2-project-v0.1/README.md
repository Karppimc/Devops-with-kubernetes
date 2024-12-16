# Exercise 1.02 and 1.04: Project v0.2

## Description
This exercise creates a web server that logs "Server started in port NNNN" on startup. The port is configurable using the `PORT` environment variable.

## Deployment Steps
- Docker image created: `karppimc/todo-app:1.0`
- Deployed to Kubernetes with 1 replica.

## Commands Used
```bash
docker build -t karppimc/todo-app:1.0 .
docker push karppimc/todo-app:1.0
kubectl apply -f deployment.yaml
kubectl get deployments
kubectl get pods

```