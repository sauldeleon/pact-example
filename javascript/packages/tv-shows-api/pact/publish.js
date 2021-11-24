const publisher = require('@pact-foundation/pact-node')
const path = require('path')
const packageJson = require('../package.json')

const opts = {
  providerBaseUrl: 'http://localhost:3001',
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'http://localhost',
  consumerVersion: packageJson.version,
}

publisher.publishPacts(opts).then(() => console.log('Pacts successfully published'))
