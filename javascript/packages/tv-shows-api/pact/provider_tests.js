const { Verifier } = require('@pact-foundation/pact')
const mockServer = require('mockttp').getLocal()

const packageJson = require('../package.json')

async function startVerification() {
  mockServer.start(9000)
  await mockServer.get('/duration/42').thenReply(200, JSON.stringify({ id: 42, duration_min: 60 }))
}

startVerification().then(() => {
  const opts = {
    providerBaseUrl: 'http://localhost:3000',
    provider: 'tv-shows-api',
    pactBrokerUrl: 'http://localhost',
    publishVerificationResult: true,
    providerVersion: packageJson.version,
    providerStatesSetupUrl: 'http://localhost:3000/provider-state',
  }

  new Verifier().verifyProvider(opts).then(function () {
    console.log('Pacts successfully verified!')
    mockServer.stop()
  })
})
