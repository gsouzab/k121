# Secret Santa
Secret Santa application, built with [Angular](https://angular.io), [Angular Material](https://material.angular.io), [Express](https://express.com) and [MongoDB](https://www.mongodb.com).

To use it, after runing the applications as shown bellow, enter the Application interface and add at least three people. After this, you can raffle and send the emails.

## Development

To run, you must install [docker-compose](https://docs.docker.com/compose/). 

With docker-compose installed, and after cloning this repo:

```bash
$ docker-compose up 
```

The Frontend application will run on [http://localhost:4200](http://localhost:4200) and the Backend on [http://localhost:3000](http://localhost:3000)

## Test

The tests were only coded on the backend. To run it:

```bash
$ docker-compose -f docker-compose.test.yml up
```