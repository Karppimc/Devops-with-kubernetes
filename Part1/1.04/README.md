# Project v0.2

- Created a manifests directory to store Kubernetes configurations.
- Created a deployment.yaml file for the TODO application.
- Applied the deployment using
```bash
kubectl apply -f manifests/deployment.yaml
kubectl get deployments
kubectl get pods
kubectl logs -f <pod-name>
```

