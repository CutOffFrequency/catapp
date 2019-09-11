const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Cats = require('../models/cats')

const handleError = (error, res, code) => {
  console.error(error)
  res.status(code).json(error)
}

router.get('/', (req, res, next) => {
  Cats.find()
    .exec()
    .then(cats => {
      console.log(cats)
      res.status(200).json(cats)
    })
    .catch(error => { handleError(error, res, 500) })
})

router.post('/', (req, res, next) => {
  const newCat = new Cats({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    temperment: req.body.temperment
  })
  newCat.save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'handling POST request to /cats',
        newCat
      })
    })
    .catch(error => { handleError(error, res, 500) })
})

router.get('/:catID', (req, res, next) => {
  const id = req.params.catID
  Cats.findById(id)
    .exec()
    .then(obj => {
      console.log(obj)
      if (obj) {
        res.status(200).json(obj)
      } else {
        handleError({message: `cat id not found: ${id}`}, res, 404)
      }
    })
    .catch(error => { handleError(error, res, 500) })
})

router.patch("/:catID", (req, res, next) => {
  const _id = req.params.catID
  Cats.updateOne({_id}, {$set: {...req.body}})
    .exec()
    .then(obj => {
      console.log(obj)
      res.status(200).json(obj)
    })
    .catch(error => { handleError(error, res, 500) })
})

router.delete("/:catID", (req, res, next) => {
  const _id = req.params.catID;
  Cats.deleteOne({_id})
    .exec()
    .then(result => {
      if (result.deletedCount === 0) {
        handleError(
          {message: `could not delete cat with id: ${_id}`},
          res,
          404
        )
      } else {
        res.status(200).json({
          message: `successfully deleted cat with id: ${_id}`
        })
      }
    })
    .catch(error => { handleError(error, res, 500) })
})

module.exports = router