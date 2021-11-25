import atexit
import unittest
from pactman import Consumer, Provider
from movies_api.main import get_duration

pact = Consumer('movies-api').has_pact_with(
    Provider('duration-provider'),
    port=9000,
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
            'a request for movies-api'
        ).with_request(
            'GET', '/duration/42'
        ) .will_respond_with(200, body=expected)

        with pact:
            result = get_duration(42)

        self.assertEqual(result, expected)

