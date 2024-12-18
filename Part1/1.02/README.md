# Project v0.1 

## Overview
This assignment creates a simple web server that outputs "Server started in port NNNN" when started. The server's port is configurable through an environment variable `PORT`.

## Commands Used

1. **Run the server locally**
   ```bash
   PORT=3000 node server.js
   ```

2. **Build the Docker image**
   ```bash
   docker build -t karppimc/todo-server:1.0 .
   ```

3. **Push the image to Docker Hub**
   ```bash
   docker push karppimc/todo-server:1.0
   ```

4. **Create the deployment imperatively in Kubernetes**
   ```bash
   kubectl create deployment todo-server-dep --image=karppimc/todo-server:1.0
   ```

5. **Verify the pod is running**
   ```bash
   kubectl get pods
   ```

6. **Check the server logs**
   ```bash
   kubectl logs <pod-name>
   ```

## What We Created
- A **Node.js web server** that outputs a message on startup.
- A **Docker image** named `karppimc/todo-server:1.0`.
- A **Kubernetes deployment** created imperatively to run the server.



