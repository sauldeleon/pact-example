class Movie {
  constructor(name, director, genre, id) {
    this.id = id
    this.name = name
    this.genre = genre
    this.director = director
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

  static validateId(movie) {
    if (typeof movie.id !== 'number') {
      throw new Error(`Movie id must be a number! Invalid value: ${movie.id}`)
    }
  }
}

export default Movie
