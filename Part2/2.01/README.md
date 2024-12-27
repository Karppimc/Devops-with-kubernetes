# 📘 Exercise 2.01: Connecting Pods via HTTP

- Goal: Connect Log-output and Pingpong applications using HTTP endpoints instead of shared volumes.

### 🛠️ Key Commands Used:
1. Deploy Services and pods
```bash
kubectl apply -f pingpong/manifests/
kubectl apply -f log-output/manifests/
```
2. Deploy Ingress:
```bash
kubectl apply -f ingress/ingress.yaml
```
4. Verify Services and Ingress:
```bash
kubectl get svc
kubectl describe ingress app-ingress
```

### Outputs:
- curl http://172.21.25.41/pingpong
- {"pongCount":6}

- curl http://172.21.25.41/logs
- 2024-12-27T17:31:33.358Z: kaqpk. Ping / Pongs: 7