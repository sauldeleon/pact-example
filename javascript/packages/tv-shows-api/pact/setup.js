const path = require('path')
const Pact = require('@pact-foundation/pact').Pact

global.durationPort = 1234
global.durationProvider = new Pact({
  cors: true,
  port: global.durationPort,
  log: path.resolve(process.cwd(), 'logs', 'pact.duration.log'),
  loglevel: 'debug',
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  pactfileWriteMode: 'update',
  consumer: 'tv-shows-api',
  provider: 'duration-provider',
  host: 'localhost',
})
