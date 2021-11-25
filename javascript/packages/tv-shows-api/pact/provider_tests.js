const { Verifier } = require('@pact-foundation/pact')
const mockServer = require('mockttp').getLocal()

const packageJson = require('../package.json')

async function startMockServer() {
  mockServer.start(9000)
  await mockServer.get('/duration/42').thenReply(200, JSON.stringify({ id: 42, duration_min: 60 }))
}

startMockServer().then(() => {
  const opts = {
    providerBaseUrl: 'http://localhost:3001',
    provider: 'tv-shows-api',
    pactBrokerUrl: 'http://localhost',
    publishVerificationResult: true,
    providerVersion: packageJson.version,
    stateHandlers: {
      ['a tv show exists']: () => {},
      ['provider allows tv show creation']: () => {},
    },
  }

  new Verifier(opts).verifyProvider().then(function () {
    console.log('Pacts successfully verified!')
    mockServer.stop()
  })
})
