jest.setTimeout(10000)

beforeAll(done => {
  Promise.all([global.durationProvider.setup()]).then(() => done())
})

afterAll(done => {
  Promise.all([global.durationProvider.finalize()]).then(() => done())
})
