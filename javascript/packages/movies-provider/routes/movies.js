const express = require('express')
const router = express.Router()

router.route('/:movie_id').get(function (req, res) {
  const movieId = parseInt(req.params['movie_id'])
  res.status(200)
  res.json({
    id: movieId,
    name: 'The Silence of the Lambs',
    genre: 'Terror',
    director: 'Jonathan Demme',
    year: 1991,
  })
})

router.route('/').post(function (req, res) {
  res.status(201)
  res.json({
    id: 42,
    name: 'The Silence of the Lambs',
    genre: 'Terror',
    director: 'Jonathan Demme',
    year: 1991,
  })
})

module.exports = router
