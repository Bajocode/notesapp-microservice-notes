![Logo of the project](./repo/logo.sample.png)

# Notes Microservice &middot; [![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/your/your-project/blob/master/LICENSE)
> Backend component of the Notes App

This app represents the notes api and provides clients with note resource methods

## Tutorial notes
- buy domain on namecheap
  - add staging and prod subdomains by pointing A records to you worker node external IP
  - if your cluster supports ingress, enable it in values.yaml
  - if not, link an DNS A-record to the external IP of a Node and append the node port to the url; `http://notes.bajo-k8s.online:30001/documentation`
  - Currently ingress disabled because IBM's free cluster doesn not allow external load balancers
- architectures used

## Stack
- kubernetes: https://kubernetes.io/
- terraform: https://www.terraform.io/
- helm: https://helm.sh/
- tekton cd: https://tekton.dev/
- hapijs: https://hapijs.com/
- mongodb: https://www.mongodb.com/

## Installing

```shell
brew install nvm
nvm install
npm install
```

This will install the correct node and npm version using [nvm](https://github.com/nvm-sh/nvm)

## Developing
```bash
# boot up mongodb (foreground)
$ docker-compose up

# run in watch mode with tsc-watch
$ npm run watch
```

## Running
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov

# unit tests
$ npm run test:unit

# integration tests
$ npm run test:integration

# e2e tests
$ npm run test:e2e
```
