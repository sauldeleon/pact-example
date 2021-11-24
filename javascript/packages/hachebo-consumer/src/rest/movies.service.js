import axios from 'axios'

import Movie from '../movie'

class MovieService {
  constructor(baseUrl, port) {
    this.baseUrl = baseUrl
    this.port = port
  }

  getMovie(movieId) {
    if (movieId == null) {
      throw new Error('movieId must not be null!')
    }
    return axios({
      method: 'GET',
      url: `/movies/${movieId}`,
      baseURL: `${this.baseUrl}:${this.port}`,
      headers: {
        Accept: 'application/json; charset=utf-8',
      },
    }).then(response => {
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
    return axios({
      method: 'POST',
      url: `/movies`,
      baseURL: `${this.baseUrl}:${this.port}`,
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: movie,
    }).then(response => {
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
