# Overview
- In this exercise, we moved our Kubernetes deployment from an imperative approach to a declarative approach using a YAML manifest file. This makes the deployment easier to maintain and version control.

- Created manifests directory
- Created deployment.yaml

```bash
kubectl delete deployment log-output-dep
kubectl apply -f manifests/deployment.yaml
kubectl get deployments
kubectl get pods
kubectl logs -f <pod-name>
```