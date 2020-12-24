docker rm node
docker build -t node:latest docker/node
docker run -d --rm --name node -v E:\projetos\videoviz\videoviz-gui:/app node:latest

