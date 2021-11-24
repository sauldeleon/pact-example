const { integer } = require('@pact-foundation/pact/src/dsl/matchers')

const DurationService = require('./duration.service')

describe('Pact with Duration API', () => {
  beforeEach(done => {
    global.durationProvider
      .addInteraction({
        state: 'there is an existing tv show',
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
    const duration = new DurationService('http://localhost', global.durationPort)
    const result = await duration.getTvShowDuration(42)
    expect(result).toEqual(expect.any(Number))
    global.durationProvider.verify().then(
      () => done(),
      error => done.fail(error),
    )
  })
})
