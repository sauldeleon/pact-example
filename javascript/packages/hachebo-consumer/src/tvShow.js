class TvShow {
  constructor(name, director, genre, seasons, year, id) {
    this.id = id
    this.name = name
    this.genre = genre
    this.director = director
    this.seasons = seasons
    this.year = year
  }

  static validateName(tvShow) {
    if (typeof tvShow.name !== 'string') {
      throw new Error(`TvShow name must be a string! Invalid value: ${tvShow.name}`)
    }
  }

  static validateDirector(tvShow) {
    if (typeof tvShow.director !== 'string') {
      throw new Error(`TvShow director must be a string! Invalid value: ${tvShow.director}`)
    }
  }

  static validateGenre(tvShow) {
    if (typeof tvShow.genre !== 'string') {
      throw new Error(`TvShow genre must be a string! Invalid value: ${tvShow.genre}`)
    }
  }

  static validateSeasons(tvShow) {
    if (typeof tvShow.seasons !== 'number') {
      throw new Error(`TvShow seasons must be a number! Invalid value: ${tvShow.seasons}`)
    }
  }

  static validateYear(tvShow) {
    if (typeof tvShow.year !== 'number') {
      throw new Error(`Year must be a number! Invalid value: ${tvShow.year}`)
    }
  }

  static validateId(tvShow) {
    if (typeof tvShow.id !== 'number') {
      throw new Error(`TvShow id must be a number! Invalid value: ${tvShow.id}`)
    }
  }
}

export default TvShow
