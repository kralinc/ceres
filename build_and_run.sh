docker build -t ceres-image .
docker run -it -p 8081:8080 --rm --name ceres ceres-image