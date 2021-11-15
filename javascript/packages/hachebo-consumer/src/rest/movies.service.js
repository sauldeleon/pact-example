import Movie from '../movie'
import adapter from 'axios/lib/adapters/http'
import { request } from 'axios'

class MovieService {
  constructor(baseUrl, port) {
    this.baseUrl = baseUrl
    this.port = port
  }

  getMovie(movieId) {
    if (movieId == null) {
      throw new Error('movieId must not be null!')
    }
    return request(
      {
        method: 'GET',
        url: `/movies/${movieId}`,
        baseURL: `${this.baseUrl}:${this.port}`,
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      },
      adapter,
    ).then(response => {
      const movie = response.data
      return new Promise((resolve, reject) => {
        try {
          this._validateIncomingMovie(movie)
          resolve(movie)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  createMovie(movie) {
    this._validateMovieForCreation(movie)
    return request(
      {
        method: 'POST',
        url: `/movies`,
        baseURL: `${this.baseUrl}:${this.port}`,
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: movie,
      },
      adapter,
    ).then(response => {
      const movie = response.data
      return new Promise((resolve, reject) => {
        try {
          this._validateIncomingMovie(movie)
          resolve(movie)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  _validateIncomingMovie(movie) {
    Movie.validateId(movie)
    Movie.validateName(movie)
    Movie.validateGenre(movie)
    Movie.validateDirector(movie)
  }

  _validateMovieForCreation(movie) {
    delete movie.id
    Movie.validateName(movie)
    Movie.validateGenre(movie)
    Movie.validateDirector(movie)
  }
}

export default MovieService
