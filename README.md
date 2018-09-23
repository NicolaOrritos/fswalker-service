FSWalker
========

A JSON microservice to expose your filesystem


## Installing

Simply clone this repo, then `npm i --production` inside it, unless you're going to use Docker, then run `docker-compose build` instead.


## Configuring

Configure port, host and other settings in the `.env` file.  
The `BASE_PATH` key sets the base directory to be exposed by the service.


## Running

Run as-is with `npm start` or use the `docker-compose.yml` file.
