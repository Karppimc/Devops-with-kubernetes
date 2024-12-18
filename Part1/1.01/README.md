# Log Output Application

## Features

- Generates a unique random string on startup.
- Outputs the random string with a timestamp every 5 seconds.
- Containerized using Docker for easy deployment.
- Deployed to Kubernetes for scalable execution.

## How It Works

1. The application is written in Node.js and uses the `crypto` library to generate a UUID (random string).
2. Logs the UUID with a timestamp every 5 seconds.

### Example Output

```
2024-12-18T10:00:00.000Z: 123e4567-e89b-12d3-a456-426614174000
2024-12-18T10:00:05.000Z: 123e4567-e89b-12d3-a456-426614174000
```

## Deployment Steps

### 1. Build the Docker Image

- Dockerfile:
  ```dockerfile
  FROM node:lts
  WORKDIR /usr/src/app
  COPY app.js .
  CMD ["node", "app.js"]
  ```
- Build the image:
  ```bash
  docker build -t karppimc/log-output:1.0 .
  ```

### 2. Push the Docker Image to Docker Hub

- Push the image to your Docker Hub account:
  ```bash
  docker push karppimc/log-output:1.0
  ```

### 3. Deploy to Kubernetes

- Create the deployment:
  ```bash
  kubectl create deployment log-output-dep --image=karppimc/log-output:1.0
  ```

### 4. Verify the Deployment

- Check the status of deployments:
  ```bash
  kubectl get deployments
  ```
- View running pods:
  ```bash
  kubectl get pods
  ```

### 5. Check Logs

- Fetch the logs from the application:
  ```bash
  kubectl logs -f <pod-name>
  ```

## Clean Up

To remove the deployment:

```bash
kubectl delete deployment log-output-dep
```



