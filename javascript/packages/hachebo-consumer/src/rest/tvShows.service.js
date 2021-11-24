import axios from 'axios'

import TvShow from '../tvShow'

class TvShowService {
  constructor(baseUrl, port) {
    this.baseUrl = baseUrl
    this.port = port
  }

  getTvShow(tvShowId) {
    if (tvShowId == null) {
      throw new Error('tvShowId must not be null!')
    }
    return axios({
      method: 'GET',
      url: `/tv-shows/${tvShowId}`,
      baseURL: `${this.baseUrl}:${this.port}`,
      headers: {
        Accept: 'application/json; charset=utf-8',
      },
    }).then(response => {
      const tvShow = response.data
      return new Promise((resolve, reject) => {
        try {
          this._validateIncomingTvShow(tvShow)
          resolve(tvShow)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  createTvShow(tvShow) {
    this._validateTvShowForCreation(tvShow)
    return axios({
      method: 'POST',
      url: `/tv-shows`,
      baseURL: `${this.baseUrl}:${this.port}`,
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: tvShow,
    }).then(response => {
      const tvShow = response.data
      return new Promise((resolve, reject) => {
        try {
          this._validateIncomingTvShow(tvShow)
          resolve(tvShow)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  _validateIncomingTvShow(tvShow) {
    TvShow.validateId(tvShow)
    TvShow.validateName(tvShow)
    TvShow.validateGenre(tvShow)
    TvShow.validateDirector(tvShow)
    TvShow.validateSeasons(tvShow)
    TvShow.validateYear(tvShow)
  }

  _validateTvShowForCreation(tvShow) {
    delete tvShow.id
    TvShow.validateName(tvShow)
    TvShow.validateGenre(tvShow)
    TvShow.validateDirector(tvShow)
    TvShow.validateSeasons(tvShow)
    TvShow.validateYear(tvShow)
  }
}

export default TvShowService
