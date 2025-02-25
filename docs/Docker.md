# Docker and Docker Compose in Ubuntu

## Installing Docker

To install Docker on Ubuntu, follow these steps:

1. Update the apt package index and install packages to allow apt to use a repository over HTTPS:
   ```bash
   sudo apt-get update
   sudo apt-get install \
     ca-certificates \
     curl \
     gnupg \
     lsb-release
   ```

2. Add Docker’s official GPG key:
   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

3. Set up the stable repository:
   ```bash
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

4. Install Docker Engine:
   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

5. Verify that Docker Engine is installed correctly by running the hello-world image:
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
