# 📘 Exercise 1.11: Persisting Data Between Applications

## 🚀 What Was Achieved:
In this exercise, we set up two applications, Log Output and Ping-Pong, to share data using a Persistent Volume (PV) and Persistent Volume Claim (PVC). The pingpong.txt file is used to store and share data between the two services.
- Log Output Application: Displays a timestamp, hash, and the ping-pong count from the shared file.
- Ping-Pong Application: Increments the ping-pong counter and saves it to the shared file.

Both applications are accessible via Ingress routes:
- /log: Displays the timestamp, hash, and ping-pong count.
- /pingpong: Displays and increments the ping-pong count.

### 🛠️ Key Commands Used:
1. Deploy Persistent Volume and Claim:
```bash
kubectl apply -f storage/persistentvolume.yaml
kubectl apply -f storage/persistentvolumeclaim.yaml
```
2. Deploy Applications:
```bash
kubectl apply -f logoutput/manifests/
kubectl apply -f pingpong/manifests/
```
3. Deploy Ingress:
```bash
kubectl apply -f ingress/ingress.yaml
```
4. Verify Services and Ingress:
```bash
kubectl get svc
kubectl describe ingress app-ingress
```