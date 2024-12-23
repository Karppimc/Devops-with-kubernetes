# 📑 What Was Done

1. Application Deployment:

- A deployment was created for the Log Output Application using a Kubernetes YAML manifest.
- The deployment ensures the application runs as a pod in the cluster.

2. NodePort Service:

- A NodePort Service was configured to expose the application externally.
- Traffic is routed from the NodePort to the pod running the application.

3. Application Access:

- The application is accessible through the Kubernetes node's IP and the assigned NodePort.
- Accessible URL: http://<Node-IP>:30080/

4. Verification:

- Kubernetes resources (Pods, Services) were verified.
- Logs were checked to ensure expected application behavior.
## Access the Application
- http://<Node-IP>:30080/
- Replace <Node-IP> with your Kubernetes node IP (e.g., 172.21.25.174).

