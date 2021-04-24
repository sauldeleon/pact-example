const { Verifier } = require('@pact-foundation/pact')
const packageJson = require('../package.json')

const opts = {
  providerBaseUrl: 'http://localhost:3000',
  provider: 'tv-shows-provider',
  pactBrokerUrl: 'http://localhost',
  publishVerificationResult: true,
  providerVersion: packageJson.version,
  providerStatesSetupUrl: 'http://localhost:3000/provider-state',
}

new Verifier().verifyProvider(opts).then(function () {
  console.log('Pacts successfully verified!')
})
