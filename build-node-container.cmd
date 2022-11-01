call docker build -t lemanoman/prebuildnode:latest -f docker/Dockerfile .
call docker build -t lemanoman/videoviz-gui:latest -f docker/add-src.Dockerfile .
