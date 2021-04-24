import TvShow from '../tvShow'
import adapter from 'axios/lib/adapters/http'
import { request } from 'axios'

class TvShowService {
  constructor(baseUrl, port) {
    this.baseUrl = baseUrl
    this.port = port
  }

  getTvShow(tvShowId) {
    if (tvShowId == null) {
      throw new Error('tvShowId must not be null!')
    }
    return request(
      {
        method: 'GET',
        url: `/tv-shows/${tvShowId}`,
        baseURL: `${this.baseUrl}:${this.port}`,
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      },
      adapter,
    ).then(response => {
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
    return request(
      {
        method: 'POST',
        url: `/tv-shows`,
        baseURL: `${this.baseUrl}:${this.port}`,
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: tvShow,
      },
      adapter,
    ).then(response => {
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
  }

  _validateTvShowForCreation(tvShow) {
    delete tvShow.id
    TvShow.validateName(tvShow)
    TvShow.validateGenre(tvShow)
    TvShow.validateDirector(tvShow)
    TvShow.validateSeasons(tvShow)
  }
}

export default TvShowService
