## Install Docker on Ubuntu

Follow these steps to install Docker on an Ubuntu system:

### Step 1: Update the package list
```bash
sudo apt update
```

### Step 1: Install Docker
```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
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

## Building and Running the Application using Docker


# Allow Port 5173 on Your Server

## For UFW (Ubuntu/Debian)
If your server uses **UFW (Uncomplicated Firewall)**, run:
```bash
sudo ufw allow 5173/tcp
sudo ufw reload
sudo ufw status

To build the Docker image for the application, use the following command:
```bash
docker build -t keyyatri-password-manager .
```

To run the Docker container for the application, use the following command:
```bash
docker run -d -p 5173:5173 keyyatri-password-manager
```

 List running Docker containers:
```bash
sudo docker ps
```

Stop a running Docker container:
```bash
sudo docker stop <container_id>
```

Remove a Docker container:
```bash
sudo docker rm <container_id>
```


# Uninstall Docker from Ubuntu

## Step 1: Remove Docker Packages
Run the following command to uninstall Docker and related packages:

```sh
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```

## Step 2: Remove Docker Directories
To delete Docker-related data, run:

```sh
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

## Step 3: Verify Docker is Removed
Check if Docker is still installed:

```sh
docker --version
```
If the command returns "command not found," Docker has been successfully removed.

## Optional: Clean Up Unused Dependencies
Run the following command to remove any unnecessary packages:

```sh
sudo apt-get autoremove
```

This will ensure that all Docker-related dependencies are cleaned up from the system.

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

