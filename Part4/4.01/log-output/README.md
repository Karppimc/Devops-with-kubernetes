# ✅ What Was Done:
In this exercise, we configured the TODO application to use Ingress for external access instead of a NodePort service. This setup allows more flexible routing and better control over incoming traffic.

- Service: Updated the service to use ClusterIP for internal cluster communication.
- Ingress: Created an Ingress resource to route external traffic to the service.
- Deployment: Ensured the application was properly deployed and accessible.

```bash
kubectl delete -f manifests/service.yaml
kubectl apply -f manifests/
kubectl get svc,ing
kubectl logs -l app=todo
kubectl describe ingress todo-ingress

```

- Go and check if works http://<minikube-ip>