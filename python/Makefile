#!/usr/bin/make -f

MOVIES_API_VERSION=2.0.0
DURATION_PROVIDER_VERSION=3.0.0

args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

%:
	@:

movies-api-generate:
	pytest movies_api/tests/create_pact.py -o log_cli=true

movies-api-publish:
	$ curl -v --silent --output /dev/null --show-error --fail -XPUT \-H "Content-Type: application/json" -d@movies_api/pacts/movies-api-duration-provider-pact.json http://localhost/pacts/provider/duration-provider/consumer/movies-api/version/$(call args, $(MOVIES_API_VERSION))

movies-api-verify:
	pytest --pact-publish-results --pact-broker-url http://localhost/ --pact-provider-name=movies-api --pact-provider-version=$(MOVIES_API_VERSION) movies_api/verify_pacts.py -v

duration-provider-verify:
	pytest --pact-publish-results --pact-broker-url http://localhost/ --pact-provider-name=duration-provider --pact-provider-version=$(DURATION_PROVIDER_VERSION) duration_provider/verify_pacts.py -v

.PHONY: movies-api-generate movies-api-publish movies-api-verify duration-provider-verify