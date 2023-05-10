const express = require('express')

const router = express.Router() // create new router object to define MW and routes, helpful for organizing data, calling the object will handle req for particular routes

const PetsController = require('../controllers/petsController') // import controller module for handling pet reqs

// Routes: get all pets, get one pet, add pet, update pet,  TODO: delete pet

// GET all pets
router.get('/', PetsController.getAllPets);

// READ a pet
router.get('/:id', PetsController.getPets);

// CREATE a pet
router.post('/', PetsController.addPets);

// UPDATE a pet
router.put('/:id', PetsController.updatePets);

// DELETE TODO:
router.delete('/:id', PetsController.deletePet);

module.exports = router