const express = require('express')
const router = express.Router()

const DurationService = require('../services/DurationService/DurationService')

// year is missing, it will fail!
router.route('/:tv_show_id').get(async function (req, res) {
  const tvShowId = parseInt(req.params['tv_show_id'])
  duration = await DurationService.getTvShowDuration(tvShowId)
  res.status(200)
  res.json({
    id: tvShowId,
    name: 'Friends',
    director: 'David Crane, Marta Kauffman',
    genre: 'Humor',
    seasons: 10,
    duration: duration,
    // year: 1994, // uncomment this line to get the pacts working again!
  })
})

router.route('/').post(function (req, res) {
  res.status(201)
  res.json({
    id: 42,
    name: 'Friends',
    director: 'David Crane, Marta Kauffman',
    genre: 'Humor',
    seasons: 10,
    // year: 1994,
  })
})

module.exports = router
