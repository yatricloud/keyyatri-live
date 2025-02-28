## Installing Docker Compose

To install Docker Compose on Ubuntu, follow these steps:

1. Download the current stable release of Docker Compose:
```bash
sudo apt update
sudo apt install docker-compose-plugin -y
```

2. Verify that Docker Compose is installed correctly:
```bash
docker compose version
```

## Running Docker Compose

To run Docker Compose on Ubuntu, you can use the following commands:

1. Navigate to the directory containing your `docker-compose.yml` file:
```bash
cd /path/to/your/project
```

2. Start the services defined in the `docker-compose.yml` file:
```bash
sudo docker compose up -d
```

3. List running Docker Compose services:
```bash
sudo docker compose ps
```

4. Stop the services defined in the `docker-compose.yml` file:
```bash
sudo docker compose down
```

5. View the logs of a service:
```bash
sudo docker compose logs <service_name>
```
