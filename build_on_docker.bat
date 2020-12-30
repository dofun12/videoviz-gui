docker stop node
docker rm node
docker build -t node:latest . -f ./build/Dockerfile
docker run -d --rm -it --name node -v E:/projetos/videoviz/videoviz-gui/gui:/app/gui node:latest

