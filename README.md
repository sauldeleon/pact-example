# Pact example

## Requirements

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com/) package manager
- [Python](https://www.python.org/) 3.9 or higher

## Run the pact-broker

- Go to `pact-broker` folder
- Create `broker.env` and `database.env` files based on sample files in the same folder. Have in mind that the same values should be applied to both files or the app won't connect with the database
- In order to use `https` you have to add your ssl certificate, generate `pact_cert.pem` and `pact_cert.key` files and push them into `packages/pact-broker/ssl/cert` folder. If you want custom names, override `packages/pact-broker/ssl/nginx.conf` file, lines 16 and 17, with your custom names. Use the following command to generate the certificates. 
  ```bash
  openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout pact_key.pem -out pact_cert.pem
  ```
- Run `docker-compose up -d`
- Use your browser to open http://localhost or https://localhost if ssl is configured correctly

## Javascript
### Set up

1. Go to `javascript` folder
2. Run `yarn` to install dependencies
3. Run pact tests :arrow_heading_down:

### Running Pact tests

- In the javascript directory, run `yarn pact`. It will run the pact tests in each project. `yarn pact:publish` will publish the results of the consumers. `yarn pact:verify` will verify all existing published pacts by each respective provider.
- You can also run manually each pact test or publishing with the following commands:
  - `yarn pact:hachebo`: hachebo pact testing and publish results
  - `yarn pact:neflis`: neflis pact testing and publish results
  - `yarn pact:movies`: movies pact testing and verify results
  - `yarn pact:tv-shows`: hachebo pact testing and verify results
  - `pact:hachebo`: hachebo pact testing
  - `pact:hachebo:publish`: hachebo publish results
  - `pact:neflis`: netflis pact testing
  - `pact:neflis:publish`: netflis publish results
  - `pact:tv-shows`: tv-shows-api pact testing
  - `pact:tv-shows:publish`: tv-shows-api publish results
  - `pact:tv-shows:verify`: tv-shows-api verify pacts

## Python

### Set up

```bash
cd pact-example/python
python3 -m venv venv
source ./venv/bin/activate
pip install .
```

### Start local apps

#### Start duration-provider
```bash
cd duration_provider
uvicorn main:app --reload --port 9000
```

#### Start movies-api
```bash
cd movies_api
uvicorn main:app --reload --port 9001
```

### Generate movies-api pacts
```bash
make movies-api-generate
```

### Publish movies-api pacts
```bash
make movies-api-publish
```

### Verify movies-api pacts
```bash
make movies-api-verify
```

### Verify duration-provider pacts
```bash
make duration-provider-verify
```