# 📚 Exercise 3.01: Deploying Ping-pong Application on GKE with PostgreSQL
- Deployed a PostgreSQL database using a StatefulSet.
- Configured PersistentVolumeClaim for data persistence.
- Created Kubernetes Secrets for PostgreSQL credentials.
- Deployed a Ping-pong application that connects to PostgreSQL.
- Exposed the Ping-pong service using a LoadBalancer.
- Verified external access to the /pingpong endpoint.


### ✅ Verification:
- PostgreSQL pod status: Running
- Ping-pong pod status: Running
- Service external IP accessible with correct response: {"message":"pong","pongCount":1}

