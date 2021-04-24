class TvShow {
  constructor(name, director, genre, seasons, id) {
    this.id = id
    this.name = name
    this.director = director
    this.genre = genre
    this.seasons = seasons
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

  static validateId(tvShow) {
    if (typeof tvShow.id !== 'number') {
      throw new Error(`TvShow id must be a number! Invalid value: ${tvShow.id}`)
    }
  }
}

export default TvShow
