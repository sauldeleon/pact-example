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
  openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout pact_cert.key -out pact_cert.pem
  ```

- Run `docker-compose up -d`
- Use your browser to open <http://localhost> or <https://localhost> if ssl is configured correctly

## Javascript

---

### Javascript set up

1. Go to `javascript` folder
2. Install dependencies with `yarn`

   ```bash
   cd javascript
   yarn
   ```

3. Run pact tests :arrow_heading_down:

### Running Pact tests

- In the javascript directory, run `yarn pact`. It will run the pact tests in each project and will generate the pacts inside each package within the _pacts_ folder. `yarn pact:publish` will publish the pact results of the consumers. `yarn pact:verify` will verify all existing published pacts by each respective provider.
- You can also run manually each pact test or publishing with the following commands:
  - `yarn pact:hachebo`: hachebo pact testing and generate pacts
  - `yarn pact:hachebo:publish`: hachebo pact publish results
  - `yarn pact:neflis`: neflis pact testing and generate pacts
  - `yarn pact:neflis:publish`: neflis pact publish results
  - `yarn pact:tv-shows`: tv shows pact testing and generate pacts
  - `yarn pact:tv-shows:publish`: tv shows pact publish results
  - `yarn pact:tv-shows:verify`: tv shows verify pacts

## Python

---

### Python set up

```bash
cd pact-example/python
python3 -m venv venv
source ./venv/bin/activate
pip install .
```

### **Start local apps**

#### _Start duration-provider_

```bash
cd duration_provider
uvicorn main:app --reload --port 9000
```

#### _Start movies-api_

```bash
cd movies-api
uvicorn main:app --reload --port 9001
```

#### _Start all servers in background_

```bash
make servers-start
```

#### _Shutdown servers_

```bash
make servers-shutdown
```

### **Pacts**

### _Generate movies-api pacts_

```bash
make movies-api-generate
```

### _Publish movies-api pacts_

```bash
make movies-api-publish
```

### _Verify movies-api pacts_

```bash
make movies-api-verify
```

### _Verify duration-provider pacts_

```bash
make duration-provider-verify
```

## Schemas

---

Regarding consumer schemas information, check [this](./Consumer%20schemas.md)
