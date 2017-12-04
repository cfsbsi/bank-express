# Bank Express

A Bank backend in [Express](http://expressjs.com)

## Getting Started

Clone the project and run 

```
npm install
```
```
npm run test
```
```
npm start
```

## How to use

It's running on port 7000

|Info|Method|Path|Input|Output|
| --- | --- | --- | --- | ---- |
|Get all accounts|Get  | /accounts|| Array of account|
|Create an account|Post | /accounts|An account payload||
|Transfer a amount of money|Post | /transfer|A transfer payload||
|Get one account by id|Get  | /accounts/{accountId}||An account

Example of payloads

Account
```
{"balance": 0}
```
Transfer
```
{
	"amount": 100, 
	"source_account_id": 1, 
	"destination_account_id": 2
}
```

### Prerequisites

```
node
```
```
npm
```

## Running the tests

Use to run all tests
```
npm run test
```
Use to run unit tests
```
npm run test-unit
```
Use to run integration tests
```
npm run test-integration
```


### And coding style tests

Use [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

To see problems in the project
```
npm run lint
```

To fix  
```
npm run lint:fix
```

## Authors

* **Christian Franco Soares** 
