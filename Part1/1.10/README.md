# Exercise 1.10: Shared Volume & Multi-Container Pod
- Deployed two containers within a single pod:

- One generates timestamps and saves them in a file.
- The other reads the file and displays the timestamps via HTTP.
- Created an Ingress resource with the following key annotation:

### Key commands used:

```bash
kubectl apply -f manifests/
kubectl describe ingress timestamp-ingress
kubectl get svc timestamp-service
kubectl logs -l app=timestamp-app --tail=50 --follow
```