const fetch = require('node-fetch')

const DurationService = {
  getTvShowDuration: async tvShowId => {
    const response = await fetch(`http://localhost:${global.durationPort}/duration/${tvShowId}`)
    const data = await response.json()
    return data.duration_min
  },
}

module.exports = DurationService
