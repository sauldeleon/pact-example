from pactman.verifier.verify import ProviderStateMissing
import requests

PORT = 9001


def provider_state(name, **params):
    if name == "provider allows duration creation":
        state = requests.post(f"http://localhost:{PORT}/_pact/setup_provider_state", json={ "state": "provider allows duration creation" })
        state.raise_for_status()
    elif name == "Given a movie exists":
        state = requests.post(f"http://localhost:{PORT}/_pact/setup_provider_state", json={ "state": "Given a movie exists" })
        state.raise_for_status()
    else:
        raise ProviderStateMissing(name)


def test_pacts(pact_verifier):
    pact_verifier.verify(provider_setup=provider_state, provider_url=f"http://localhost:{PORT}")

