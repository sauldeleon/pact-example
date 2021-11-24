#!/usr/bin/make -f

args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

%:
	@:

pactman-movies-api-publish:
	$ curl -v --silent --output /dev/null --show-error --fail -XPUT \-H "Content-Type: application/json" -d@pacts/pactman/movies-api-duration-provider-pact.json http://localhost/pacts/provider/duration-provider/consumer/movies-api/version/$(call args, "1.0.0")

.PHONY: pactman-movies-api-publish pactman-duration-provider-verify