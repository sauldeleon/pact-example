#!/usr/bin/make -f

MOVIES_API_VERSION=0.1.0
DURATION_PROVIDER_VERSION=0.0.1

args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

%:
	@:

movies-api-generate:
	pytest movies_api/tests/create_pact.py -o log_cli=true

movies-api-publish:
	$ curl -v --silent --output /dev/null --show-error --fail -XPUT \-H "Content-Type: application/json" -d@movies_api/pacts/movies-api-duration-provider-pact.json http://localhost/pacts/provider/duration-provider/consumer/movies-api/version/$(call args, $(MOVIES_API_VERSION))

movies-api-verify:
	pactman-verifier -b http://localhost/ movies-api http://localhost:9001 http://localhost:9001/_pact/provider_states -a $(MOVIES_API_VERSION) -r

duration-provider-verify:
	pactman-verifier -b http://localhost/ duration-provider http://localhost:9000 http://localhost:9000/_pact/provider_states -a $(DURATION_PROVIDER_VERSION) -r

servers-start:
	nohup python movies_api/main.py & nohup python duration_provider/main.py &

servers-shutdown:
	kill $$(lsof -t -i :9000); kill $$(lsof -t -i :9001)

.PHONY: movies-api-generate movies-api-publish movies-api-verify duration-provider-verify start-servers shutdown-servers