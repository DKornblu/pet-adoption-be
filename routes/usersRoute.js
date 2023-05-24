const express = require('express')

const router = express.Router() // create new router object to define MW and routes, helpful for organizing data, calling the object will handle req for particular routes

const UsersController = require('../controllers/usersController') // import controller for handling user requests
const { doesUserExist, isNewUser, encryptPwd } = require('../middleware/userMiddleware');

// POST (signup + login) 
router.post('/signup', isNewUser, encryptPwd, UsersController.signup);
router.post('/login', doesUserExist, UsersController.login);

router.post('/:userId/save/:petId', UsersController.savePets);

// TODO: UPDATE user profile
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`This is a route to update user with ID: ${userId}`);
});

// For admin:
router.get('/', UsersController.getAllUsers);
router.delete('/:id', UsersController.deleteUser)

// FIXME: get by id instead
router.get('/:email', UsersController.getSingleUser);

module.exports = router