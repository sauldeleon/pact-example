class Movie {
  constructor(name, director, genre, year, duration, id) {
    this.id = id
    this.name = name
    this.genre = genre
    this.director = director
    this.year = year
    this.duration = duration
  }

  static validateName(movie) {
    if (typeof movie.name !== 'string') {
      throw new Error(`Movie name must be a string! Invalid value: ${movie.name}`)
    }
  }

  static validateDirector(movie) {
    if (typeof movie.director !== 'string') {
      throw new Error(`Movie director must be a string! Invalid value: ${movie.director}`)
    }
  }

  static validateGenre(movie) {
    if (typeof movie.genre !== 'string') {
      throw new Error(`Movie genre must be a string! Invalid value: ${movie.genre}`)
    }
  }

  static validateYear(movie) {
    if (typeof movie.year !== 'number') {
      throw new Error(`Year must be a number! Invalid value: ${movie.year}`)
    }
  }

  static validateDuration(movie) {
    if (typeof movie.duration !== 'number') {
      throw new Error(`Duration must be a number! Invalid value: ${movie.duration}`)
    }
  }

  static validateId(movie) {
    if (typeof movie.id !== 'number') {
      throw new Error(`Movie id must be a number! Invalid value: ${movie.id}`)
    }
  }
}

export default Movie
