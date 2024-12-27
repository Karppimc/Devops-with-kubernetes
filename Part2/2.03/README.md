# 📘 🛠️ What We Did in Exercise 2.03:
1. Created Namespace: app-space
2. Moved Applications:
- Log-output → app-space
- Ping-pong → app-space
3. Updated Manifests:
- Deployment and Service manifests updated with namespace: app-space
4. Updated Ingress:
- Properly referenced services in app-space namespace
5. Tested Endpoints:
- /log and /pingpong verified via Ingress routing

### Commands
```bash
kubectl get all -n app-space
```
```bash
kubectl describe ingress app-ingress -n app-space
```
```bash
curl http://<ingress ip>/log
curl http://<ingress ip>/pingpong
```

