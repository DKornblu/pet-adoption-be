const express = require('express')

const router = express.Router() // create new router object to define MW and routes, helpful for organizing data, calling the object will handle req for particular routes

// GET all users TODO:
router.get('/', (req, res) => {
    res.send('This is a route to get all the users');
  });
  
  
  // CREATE TODO:
  router.post('/signup', (req, res) => {
    res.send('This is a route to create a new user');
  });
  
  router.post('/login', (req, res) => {
    res.send('This is a route to login');
  });
  
  // READ TODO:
  router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`This is a route to get user with ID: ${userId}`);
  });
  
  // UPDATE TODO:
  router.put('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`This is a route to update user with ID: ${userId}`);
  });
  
  // DELETE TODO:
  router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`This is a route to delete user with ID: ${userId}`);
  });
  
  
  module.exports = router