const path = require('path')
const Pact = require('@pact-foundation/pact').Pact

global.moviesPort = 1234
global.tvShowsPort = 1235

global.moviesProvider = new Pact({
  cors: true,
  port: global.moviesPort,
  log: path.resolve(process.cwd(), 'logs', 'pact.movies.log'),
  loglevel: 'debug',
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  pactfileWriteMode: 'update',
  consumer: 'hachebo-consumer',
  provider: 'movies-api',
  host: 'localhost',
})

global.tvShowsProvider = new Pact({
  cors: true,
  port: global.tvShowsPort,
  log: path.resolve(process.cwd(), 'logs', 'pact.tvShows.log'),
  loglevel: 'debug',
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  pactfileWriteMode: 'update',
  consumer: 'hachebo-consumer',
  provider: 'tv-shows-api',
  host: 'localhost',
})
