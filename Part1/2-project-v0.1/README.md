# Exercise 1.02,1.04,1.05: Project v0.3

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

## Steps in 1.05
- Modified the application to serve an HTML page.
- Rebuilt the Docker image (`karppimc/todo-app:1.1`).
- Updated the Kubernetes deployment to use the new image.
- Verified accessibility using `kubectl port-forward` and accessed the app in a browser.