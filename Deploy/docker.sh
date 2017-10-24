#!/usr/bin/env bash
cd ..

docker pull postgres
docker run -p 5432:5432 --name db -e POSTGRES_DB=webretail -e POSTGRES_PASSWORD=postgres -d postgres

docker build -t webretail .
docker run -d -p 80:8181 --link db -t webretail