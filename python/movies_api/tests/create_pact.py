import atexit
import unittest
from pactman import Consumer, Provider, Like
from movies_api.main import get_duration, post_duration

pact = Consumer('movies-api').has_pact_with(
    Provider('duration-provider'),
    port=9000,
    log_dir='./movies_api/logs',
    pact_dir='./movies_api/pacts'
)
pact.start_service()
atexit.register(pact.stop_service)


class DurationContract(unittest.TestCase):

    def test_get_duration(self):
        expected = {
            "id": 42,
            "duration_min": 192,
        }
        expected_pact = Like(expected)

        pact.given(
            'Given a movie exists'
        ).upon_receiving(
            'a request for movies-api'
        ).with_request(
            'GET', '/duration/42'
        ).will_respond_with(200, body=expected_pact)

        with pact:
            result = get_duration(42)

        self.assertEqual(result, expected)
    
    def test_post_duration(self):
        expected_response = {
            'id': 42,
            'duration_min': 192
        }
        expected_pact = Like(expected_response)

        pact.given(
            'provider allows duration creation'
        ).upon_receiving(
            'a request for create a duration'
        ).with_request(
            'POST', '/duration',  body={'duration_min': Like(192)}
        ).will_respond_with(201, body=expected_pact)

        with pact:
            result = post_duration(192)


        self.assertEqual(result, expected_response)

