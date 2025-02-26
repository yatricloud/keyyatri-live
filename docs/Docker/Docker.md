## Install Docker on Ubuntu

Follow these steps to install Docker on an Ubuntu system:

### Step 1: Update the package list
```bash
sudo apt update
```

### Step 2: Install required dependencies
```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

### Step 3: Add Docker’s official GPG key
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

### Step 4: Add Docker repository
```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```

### Step 5: Update package list again
```bash
sudo apt update
```

### Step 6: Verify the available Docker versions
```bash
apt-cache policy docker-ce
```

### Step 7: Install Docker
```bash
sudo apt install docker-ce
```

### Step 8: Check Docker status
```bash
sudo systemctl status docker
```

### Step 8: Check Docker status Verify that Docker Engine is installed correctly by running the hello-world image:
```bash
sudo docker run hello-world
```

## Installing Docker Compose

To install Docker Compose on Ubuntu, follow these steps:

1. Download the current stable release of Docker Compose:
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/$(sudo curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K.*\d')" /usr/local/bin/docker-compose
```

2. Apply executable permissions to the binary:
```bash
sudo chmod +x /usr/local/bin/docker-compose
```

3. Verify that Docker Compose is installed correctly:
```bash
docker-compose --version
```

## Running Docker

To run Docker on Ubuntu, you can use the following commands:

1. Start a Docker container:
```bash
sudo docker run -d -p 80:80 docker/getting-started
```

2. List running Docker containers:
```bash
sudo docker ps
```

3. Stop a running Docker container:
```bash
sudo docker stop <container_id>
```

4. Remove a Docker container:
```bash
sudo docker rm <container_id>
```

## Running Docker Compose

To run Docker Compose on Ubuntu, you can use the following commands:

1. Navigate to the directory containing your `docker-compose.yml` file:
```bash
cd /path/to/your/project
```

2. Start the services defined in the `docker-compose.yml` file:
```bash
sudo docker-compose up -d
```

3. List running Docker Compose services:
```bash
sudo docker-compose ps
```

4. Stop the services defined in the `docker-compose.yml` file:
```bash
sudo docker-compose down
```

5. View the logs of a service:
```bash
sudo docker-compose logs <service_name>
```

## Building and Running the Application using Docker

To build the Docker image for the application, use the following command:
```bash
docker build -t keyyatri-password-manager .
```

To run the Docker container for the application, use the following command:
```bash
docker run -d -p 5173:5173 keyyatri-password-manager
```
