const mockServer = require('./mocks/server').setupServer
global.mockServerPort = require('./mocks/server').mockServerPort

beforeAll(() => {
  mockServer.listen()
})

afterEach(() => {
  mockServer.resetHandlers()
})

afterAll(() => {
  mockServer.close()
})
