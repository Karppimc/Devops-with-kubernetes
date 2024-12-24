# 🚀 TODO Application with Hourly Cached Image
This Kubernetes-deployed application serves a TODO list and displays an hourly cached image fetched from Lorem Picsum. The image is stored in a Persistent Volume to ensure it persists across pod restarts.

📚 Features
- ✅ Hourly Image Cache: A random image is fetched every hour and served at /image.
- ✅ Persistent Volume Storage: The image persists even if the pod restarts.
- ✅ Ingress Access: Accessible via Kubernetes Ingress at a defined path.

### ✅ Verification Steps
```bash
kubectl get pv
kubectl get pvc
kubectl get deployment todo
kubectl rollout restart deployment/todo


```
