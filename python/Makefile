#!/usr/bin/make -f

MOVIES_API_VERSION=2.0.0
DURATION_PROVIDER_VERSION=3.0.0

args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

%:
	@:

movies-api-generate:
	python -m unittest movies_api/tests/create_pact.DurationContract

movies-api-publish:
	$ curl -v --silent --output /dev/null --show-error --fail -XPUT \-H "Content-Type: application/json" -d@movies_api/pacts/movies-api-duration-provider-pact.json http://localhost/pacts/provider/duration-provider/consumer/movies-api/version/$(call args, $(MOVIES_API_VERSION))

movies-api-verify:
	pactman-verifier -b http://localhost/ movies-api http://localhost:9001 http://localhost:9001/_pact/provider_states -a $(MOVIES_API_VERSION) -r

duration-provider-verify:
	pactman-verifier -b http://localhost/ duration-provider http://localhost:9000 http://localhost:9000/_pact/provider_states -a $(DURATION_PROVIDER_VERSION) -r

.PHONY: movies-api-generate movies-api-publish movies-api-verify duration-provider-verify