import MovieService from './movies.service'
import * as Pact from '@pact-foundation/pact'
import Movie from '../movie'

describe('MovieService API', () => {
  const movieService = new MovieService('http://localhost', global.moviesPort)

  // a matcher for the content type "application/json" in UTF8 charset
  // that ignores the spaces between the ";2 and "charset"
  const contentTypeJsonMatcher = Pact.Matchers.term({
    matcher: 'application\\/json; *charset=utf-8',
    generate: 'application/json; charset=utf-8',
  })

  describe('getMovie()', () => {
    beforeEach(done => {
      global.moviesProvider
        .addInteraction({
          state: 'a movie exists',
          uponReceiving: 'a GET request for a movie',
          withRequest: {
            method: 'GET',
            path: '/movies/42',
            headers: {
              Accept: contentTypeJsonMatcher,
            },
          },
          willRespondWith: {
            status: 200,
            headers: {
              'Content-Type': contentTypeJsonMatcher,
            },
            body: Pact.Matchers.somethingLike({
              id: 42,
              name: 'The Silence of the Lambs',
              genre: 'Terror',
              director: 'Jonathan Demme',
              year: 1991,
              duration: 192,
            }),
          },
        })
        .then(() => done())
    })

    it('sends a request according to contract', done => {
      movieService
        .getMovie(42)
        .then(movie => expect(movie.name).toEqual('The Silence of the Lambs'))
        .then(() =>
          global.moviesProvider.verify().then(
            () => done(),
            error => done.fail(error),
          ),
        )
        .catch(done)
    })
  })

  describe('createMovie()', () => {
    beforeEach(done => {
      global.moviesProvider
        .addInteraction({
          state: 'provider allows movie creation',
          uponReceiving: 'a POST request to create a movie',
          withRequest: {
            method: 'POST',
            path: '/movies',
            headers: {
              Accept: contentTypeJsonMatcher,
              'Content-Type': contentTypeJsonMatcher,
            },
            body: {
              name: 'The Silence of the Lambs',
              genre: 'Terror',
              director: 'Jonathan Demme',
              year: 1991,
              duration: 192,
            },
          },
          willRespondWith: {
            status: 201,
            headers: {
              'Content-Type': contentTypeJsonMatcher,
            },
            body: Pact.Matchers.somethingLike({
                id:42,
                name: 'The Silence of the Lambs',
                genre: 'Terror',
                director: 'Jonathan Demme',
                year: 1991,
                duration: 192,
              }),
          },
        })
        .then(() => done())
    })

    it('sends a request according to contract', done => {
      movieService
        .createMovie(new Movie('The Silence of the Lambs', 'Jonathan Demme', 'Terror',  1991, 192))
        .then(movie => expect(movie.year).toEqual(1991))
        .then(() =>
          global.moviesProvider.verify().then(
            () => done(),
            error => done.fail(error),
          ),
        )
        .catch(done)
    })
  })
})
