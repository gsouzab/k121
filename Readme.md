# Secret Santa
Secret Santa application, built with [Angular](https://angular.io), [Angular Material](https://material.angular.io), [Express](https://express.com) and [MongoDB](https://www.mongodb.com).

To use it, after runing the applications as shown bellow, enter the Application interface and add at least three people. After this, you can raffle and send the emails.

## Development

To run, you must install [docker-compose](https://docs.docker.com/compose/). 

Copy the .env file to set the enviroment variables on the backend.

```sh
$ cd backend
$ cp .env.template .env 
```

With your favorite text editor, set the mail configurations. We use the [Nodemailer](https://nodemailer.com/about/) module for mail sending. 

```sh
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=xxxxxxxxxxx
MAIL_PASS=xxxxxxxxxxx
```

With docker-compose installed, and after cloning this repo:

```sh
$ docker-compose up 
```

The Frontend application will run on [http://localhost:4200](http://localhost:4200) and the Backend on [http://localhost:3000](http://localhost:3000)

## Test

The tests were only coded on the backend. To run it:

```sh
$ docker-compose -f docker-compose.test.yml up
```