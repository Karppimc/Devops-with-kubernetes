# 📄 Exercise 1.09: Multiple Services with Shared Ingress
In this exercise, we deployed two separate applications – Log Output and Ping-Pong – and configured them to share a single Ingress for external access.

## 🛠️ What Was Done:
1. Log Output Application
- Exposes an endpoint to display a random string and timestamp.
- Accessible at /log.

2. Ping-Pong Application
- Responds with "pong" and an incrementing counter on each request.
- Accessible at /pingpong.

3. Ingress Configuration:
- Configured a single Ingress resource to route traffic based on paths:
- /log → Log Output Service
- /pingpong → Ping-Pong Service

### Commands used:
```bash
# Apply Log Output and Ping-Pong manifests
kubectl apply -f log-output/manifests/
kubectl apply -f pingpong/manifests/
```
```bash
# Apply Ingress
kubectl apply -f ingress/ingress.yaml
```
```bash
# Verify everything
kubectl get pods
kubectl describe ingress app-ingress
```