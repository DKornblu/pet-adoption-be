const express = require('express')

const router = express.Router() // create new router object, helpful for organizing data, calling 'router' will handle req for particular routes

const PetsController = require('../controllers/petsController') // import controller module for handling pet reqs

// router.REQ('/', PetsController...);
router.route('/')
.get(PetsController.getAllPets)
.post(PetsController.addPets)

router.get('/search', PetsController.getSearchedPets)

// router.REQ('/:id', PetsController...);
router.route('/:id')
.get(PetsController.getSinglePets)
.put(PetsController.updatePets)
.delete(PetsController.deletePets)

module.exports = router