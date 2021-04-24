# Pact example

## Requirements

- Docker compose
- yarn

## Instalation

1. Run `yarn` to install dependencies
2. To run the pact-broker
   - Go to `packages/pact-broker`
   - Create a `broker.env` and `database.env` files based on sample files in the same folder. Have in mind that the same values should be applied to both files or the app won't connect with the database
   - In order to use https you have to add your ssl certificate, generate `pact_cert.pem` and `pact_cert.key` files and push them into `packages/pact-broker/ssl/cert` folder. If you want custom names, override `packages/pact-broker/ssl/nginx.conf` file, lines 16 and 17, with your custom names
   - Run `docker-compose up -d`
   - Use your browser to open http://localhost or https://localhost if ssl is configured

## Running Pact tests

- In the root directory, run `yarn pact`. It will run the pact tests in each project and publish the results if its a consumer or verify them if its a provider.
- You can also run manually each pact test with the following commands:
  - `pact:hachebo`: hachebo pact testing and publish results
  - `pact:neflis`: neflis pact testing and publish results
  - `pact:movies`: movies pact testing and verify results
  - `pact:tv-shows`: hachebo pact testing and verify results
