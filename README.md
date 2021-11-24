# Pact example

## Requirements

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com/) package manager

## Run the pact-broker

- Go to `pact-broker` folder
- Create `broker.env` and `database.env` files based on sample files in the same folder. Have in mind that the same values should be applied to both files or the app won't connect with the database
- In order to use https you have to add your ssl certificate, generate `pact_cert.pem` and `pact_cert.key` files and push them into `packages/pact-broker/ssl/cert` folder. If you want custom names, override `packages/pact-broker/ssl/nginx.conf` file, lines 16 and 17, with your custom names
- `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout pact_key.pem -out pact_cert.pem`
- Run `docker-compose up -d`
- Use your browser to open http://localhost or https://localhost if ssl is configured

## Installation of javascript example

1. Go to `javascript` folder
2. Run `yarn` to install dependencies
3. Run pact tests :arrow_heading_down:

## Running Pact tests in javascript side

- In the javascript directory, run `yarn pact`. It will run the pact tests in each project and publish the results if it's a consumer or verify them if it's a provider.
- You can also run manually each pact test with the following commands:
  - `yarn pact:hachebo`: hachebo pact testing and publish results
  - `yarn pact:neflis`: neflis pact testing and publish results
  - `yarn pact:movies`: movies pact testing and verify results
  - `yarn pact:tv-shows`: hachebo pact testing and verify results

## Installation of Python example

### Set up

```bash
cd pact-example/python
python3 -m venv venv
source ./venv/bin/activate
pip install .
```

### Start local apps

```bash
cd duration_provider
uvicorn main:app --reload --port 9000
```

```bash
cd movies_api
uvicorn main:app --reload --port 9001
```

### Generate pacts (with mocks)

- Pact-python

  ```bash
  cd pacts/pact-python
  python -m unittest create_pact_mocked.GetDurationContract.test_get_duration
  ```

- Pactman
  ```bash
  cd pacts/pactman
  python -m unittest create_pact_mocked.GetDurationContract.test_get_duration
  ```

### Generate pacts (no mocks)

First, start the local apps, then

- Pact-python

  ```bash
  cd pacts/pact-python
  python -m unittest create_pact_live.GetDurationContract.test_get_duration
  ```

- Pactman
  ```bash
  cd pacts/pactman
  python -m unittest create_pact_live.GetDurationContract.test_get_duration
  ```
### Publish pacts
- Pactman
  ```bash
  make pactman-movies-api-publish
  ```