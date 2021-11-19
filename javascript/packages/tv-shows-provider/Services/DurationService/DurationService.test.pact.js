const { integer } = require('@pact-foundation/pact/src/dsl/matchers')

const { getTvShowDuration } = require('./DurationService')

describe('Pact with Duration API', () => {
  beforeEach(done => {
    global.durationProvider
      .addInteraction({
        state: 'there is a movie id',
        uponReceiving: 'a request for tv show duration',
        withRequest: {
          path: '/duration/42',
          method: 'GET',
        },
        willRespondWith: {
          body: { id: 42, duration_min: integer() },
          status: 200,
        },
      })
      .then(() => done())
  })

  it('will receive the duration of tv show', async done => {
    const result = await getTvShowDuration(42)
    expect(result).toEqual(expect.any(Number))
    global.durationProvider.verify().then(
      () => done(),
      error => done.fail(error),
    )
  })
})
