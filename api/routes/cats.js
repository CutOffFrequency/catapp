const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Cats = require('../models/cats')

router.get('/', (req, res, next) => {
  Cats.find()
    .exec()
    .then(cats => {
      console.log(cats)
      res.status(200).json(cats)
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({error})
    })
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
    .catch(error => {
      console.log(error)
      res.status(500).json({error})
    })
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
        res.status(404).json({message: `cat id not found: ${id}`})
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500)
        .json({error})
    })
})

router.patch(":/catID", (req, res, next) => {
  // const _id = req.params.catID
  // Cats.update({_id}, {$set: {...req.body}})
  res.status(200).json({
    message: 'ok'
  })
})

router.delete("/:catID", (req, res, next) => {
  const _id = req.params.catID;
  Cats.deleteOne({_id})
    .exec()
    .then(result => {
      if (result.deletedCount === 0) {
        res.status(404).json({
          message: `could not delete cat with id: ${_id}`
        })
      } else {
        res.status(200).json({
          message: `successfully deleted cat with id: ${_id}`
        })
      }
    })
    .catch(error => {
      res.status(500).json({error})
    })
})

module.exports = router