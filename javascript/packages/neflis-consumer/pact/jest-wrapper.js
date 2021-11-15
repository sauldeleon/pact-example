jest.setTimeout(10000)

beforeAll(done => {
  Promise.all([global.moviesProvider.setup(), global.tvShowsProvider.setup()]).then(() => done())
})

afterAll(done => {
  Promise.all([global.moviesProvider.finalize(), global.tvShowsProvider.finalize()]).then(() => done())
})
