## Building and Pushing Docker Image to Docker Hub

# Step 1: Log in to Docker Hub
```bash
docker login
```

# Step 2: Build and tag the image for Docker Hub
```bash
docker build -t yatricloud/keyyaatri-image:latest .
```

# Step 3: Push the image to Docker Hub
```bash
docker push yatricloud/keyyaatri-image:latest
```

## Pulling and Running the Image from Docker Hub

# Step 1: Pull the image from Docker Hub
```bash
docker pull yatricloud/keyyaatri-image:latest
```

# Step 2: Run the container locally
```bash
docker run -d -p 5173:5173 yatricloud/keyyaatri-image:latest
```

# Step 3: Verify running container
```bash
sudo docker ps
```

## Additional Docker Hub Commands

# List all Docker images
```bash
docker images
```

# Remove a specific Docker image
```bash
docker rmi <image_id>
```

# Remove all unused Docker images
```bash
docker image prune -a
```

# List all Docker containers (running and stopped)
```bash
docker ps -a
```

# Remove all stopped containers
```bash
docker container prune
```

# Check Docker Hub repository tags
```bash
docker search keyyaatri-image
```

# View Docker logs of a container
```bash
docker logs <container_id>
```

# Show container details (Inspect)
```bash
docker inspect <container_id>
```

# Show running processes inside a container
```bash
docker top <container_id>
```

# Enter a running container
```bash
docker exec -it <container_id> /bin/bash
