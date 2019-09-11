const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const catRoutes = require('./api/routes/cats')

mongoose.connect(
  `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@cluster0-jg5tn.azure.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Acess-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, DELETE, PATCH')
  }
  next()
})

app.use('/cats', catRoutes)

app.use((req, res, next) => {
  const error = new Error('route not found')
  error.status = 400
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: { message: err.message}
  })
})

module.exports = app
