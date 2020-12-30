#!/bin/bash
docker stop node
docker rm node
docker build -t node:latest . -f ./build/Dockerfile
docker run -d --rm -it --name node -v $(pwd)/gui:/app/gui node:latest

