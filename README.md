# auth-example

### Clone using ssh:
```sh
$ git clone git@github.com:andersonscherrrer/auth-example.git
```
### Clone using https (require password):
```sh
$ git clone https://github.com/andersonscherrrer/auth-example.git
```

## api-node

### Running api-node
```sh
$ cd auth-example/api-node
$ npm install
$ node server.js
```
### Endpoints
Signup user: POST {displayNem: 'teste', email: 'test@test.com', password: 'teste'} http://localhost:3000/auth/signup
Login user: POST {email: 'test@test.com', password: 'teste'} http://localhost:3000/auth/login
Get user logged info: http://localhost:3000/api/me

## client-angular1_X

### Running client-angular1_X
Just open index.html file locate in client-angular1_X folder 
Using Firefox to avoid local files with cors errors on Chrome
Or run on server (obs: run this server after run api-node
```sh
$ cd auth-example/auth-angular1_X
$ npm install
$ npm run dev
```

### Routes
Signup user: /register
Login user: /login
Home if user is logged: /

## client-angular1_X

### Running client-angular2_X
Just open index.html file locate in client-angular2_X folder 
Using Firefox to avoid local files with cors errors on Chrome
Or run on server (obs: run this server after run api-node
```sh
$ cd auth-example/auth-angular2_X
$ npm install
$ npm run dev
```

### Routes
Signup user: /register
Login user: /login
Home if user is logged: /
