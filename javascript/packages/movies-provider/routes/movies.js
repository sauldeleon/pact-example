const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

router.route('/:movie_id').get(function (req, res) {
  const movieId = parseInt(req.params['movie_id'])
  fetch(`http://localhost:9000/duration/${movieId}`)
    .then(resp => resp.json())
    .then(resp => {
      res.status(200)
      res.json({
        id: movieId,
        name: 'The Silence of the Lambs',
        genre: 'Terror',
        director: 'Jonathan Demme',
        year: 1991,
        duration: resp.duration_min,
      })
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
