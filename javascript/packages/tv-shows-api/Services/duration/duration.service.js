const axios = require('axios')

class DurationService {
  constructor(baseUrl, port) {
    this.baseUrl = baseUrl
    this.port = port
  }

  async getTvShowDuration(tvShowId) {
    const response = await axios({
      url: `/duration/${tvShowId}`,
      baseURL: `${this.baseUrl}:${this.port}`,
    })
    return response.data.duration_min
  }
}

module.exports = DurationService
