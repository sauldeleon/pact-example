import TvShowsService from './tvShows.service'
import * as Pact from '@pact-foundation/pact'
import TvShow from '../tvShow'

describe('TvShowService API', () => {
  const tvShowsService = new TvShowsService('http://localhost', global.tvShowsPort)

  // a matcher for the content type "application/json" in UTF8 charset
  // that ignores the spaces between the ";2 and "charset"
  const contentTypeJsonMatcher = Pact.Matchers.term({
    matcher: 'application\\/json; *charset=utf-8',
    generate: 'application/json; charset=utf-8',
  })

  describe('getTvShow()', () => {
    beforeEach(done => {
      global.tvShowsProvider
        .addInteraction({
          state: 'a tv show exists',
          uponReceiving: 'a GET request for a tv show',
          withRequest: {
            method: 'GET',
            path: '/tv-shows/42',
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
              name: 'Friends',
              genre: 'Humor',
              director: 'David Crane, Marta Kauffman',
              seasons: 10,
              year: 1994
            }),
          },
        })
        .then(() => done())
    })

    it('sends a request according to contract', done => {
      tvShowsService
        .getTvShow(42)
        .then(tvShow => expect(tvShow.name).toEqual('Friends'))
        .then(() =>
          global.tvShowsProvider.verify().then(
            () => done(),
            error => done.fail(error),
          ),
        )
        .catch(done)
    })
  })

  describe('createTvShow()', () => {
    beforeEach(done => {
      global.tvShowsProvider
        .addInteraction({
          state: 'provider allows tv show creation',
          uponReceiving: 'a POST request to create a tv show',
          withRequest: {
            method: 'POST',
            path: '/tv-shows',
            headers: {
              Accept: contentTypeJsonMatcher,
              'Content-Type': contentTypeJsonMatcher,
            },
            body: {
              name: 'Friends',
              genre: 'Humor',
              director: 'David Crane, Marta Kauffman',
              seasons: 10,
              year: 1994
            },
          },
          willRespondWith: {
            status: 201,
            headers: {
              'Content-Type': contentTypeJsonMatcher,
            },
            body: Pact.Matchers.somethingLike({
              id: 42,
              name: 'Friends',
              genre: 'Humor',
              director: 'David Crane, Marta Kauffman',
              seasons: 10,
              year: 1994
            }),
          },
        })
        .then(() => done())
    })

    it('sends a request according to contract', done => {
      tvShowsService
        .createTvShow(new TvShow('Friends', 'David Crane, Marta Kauffman', 'Humor', 10, 1994))
        .then(tvShow => expect(tvShow.id).toEqual(42))
        .then(() =>
          global.tvShowsProvider.verify().then(
            () => done(),
            error => done.fail(error),
          ),
        )
        .catch(done)
    })
  })
})
