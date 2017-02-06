# auth-example

## api-node

### Clone using ssh:
```sh
$ git clone git@github.com:andersonscherrrer/auth-example.git
```
### Clone using https (require password):
```sh
$ git clone https://github.com/andersonscherrrer/auth-example.git
```
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
