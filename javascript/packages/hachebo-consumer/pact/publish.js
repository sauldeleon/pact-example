const publisher = require('@pact-foundation/pact-node')
const path = require('path')
const packageJson = require('../package.json')

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'http://localhost',
  consumerVersion: packageJson.version,
}

publisher.publishPacts(opts).then(() => console.log('Pacts successfully published'))
