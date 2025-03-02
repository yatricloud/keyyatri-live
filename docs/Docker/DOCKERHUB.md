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
