import atexit
import unittest
from pactman import Consumer, Provider
from movies_provider.main import get_duration

pact = Consumer('movies-provider').has_pact_with(
    Provider('duration-provider'),
    port=9000,
    use_mocking_server=True,
    log_dir='./',
    pact_dir='./'
)
pact.start_service()
atexit.register(pact.stop_service)


class GetDurationContract(unittest.TestCase):

    def test_get_duration(self):
        expected = {
            "id": 42,
            "duration_min": 192,
        }
        pact.given(
            'Given a movie exists'
        ).upon_receiving(
            'a request for movies-provider'
        ).with_request(
            'GET', '/duration/42'
        ) .will_respond_with(200, body=expected)

        with pact:
            result = get_duration(42)

        self.assertEqual(result, expected)
