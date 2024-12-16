# Exercise 1.01: Getting Started

## Description
This assignment deploys an application that generates and outputs a random string with a timestamp every 5 seconds.

## Steps
- Created `deployment.yaml` with the following configuration:
  - App: `log-output`
  - Image: `karppimc/log-output:1.0`
  - Replicas: 1

- Commands Used:
```bash
kubectl apply -f deployment.yaml
kubectl get deployments
kubectl get pods
kubectl logs -f log-output-dep-7c4d88b599-qd4vq
```


## Verification
- Logs show random strings with timestamps.

# Exercise 1.03: Declarative approach

- Changed .yaml file inside manifest directory
- deleted old deployment and created it again with these commands:

```bash
kubectl delete deployment log-output-dep
kubectl apply -f manifests/deployment.yaml
```