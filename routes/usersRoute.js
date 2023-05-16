const express = require('express')

const router = express.Router() // create new router object to define MW and routes, helpful for organizing data, calling the object will handle req for particular routes

const UsersController = require('../controllers/usersController') // import controller for handling user requests
const { doesUserExist, isNewUser, encryptPwd } = require('../middleware/userMiddleware');
const { getUserByEmail } = require('../models/usersModels');

// GET all users
router.get('/', UsersController.getAllUsers);
// POST (signup + login) 
router.post('/signup', isNewUser, encryptPwd, UsersController.signup);
router.post('/login', doesUserExist, UsersController.login);
// READ (single user by email)
router.get('/:email', UsersController.getSingleUser);
// DELETE (user by id)
router.delete('/:id', UsersController.deleteUser)

// UPDATE TODO:
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`This is a route to update user with ID: ${userId}`);
});


module.exports = router