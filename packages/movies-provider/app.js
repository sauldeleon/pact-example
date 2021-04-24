const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const moviesRouter = require('./routes/movies')
const providerStateRouter = require('./routes/provider_state')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/movies', moviesRouter)

if (process.env.PACT_MODE === 'true') {
  app.use('/provider-state', providerStateRouter)
}

module.exports = app
