
const { getUserList, getUserByEmail, addNewUser, deleteUserDetails } = require('../models/usersModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function getAllUsers(req, res) {
    try {
        const userList = await getUserList();
        console.log(`GET request, got all users!`)
        res.status(200).send(userList);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function getSingleUser(req, res) {
    try {
        const userEmail = req.params.email;
        console.log(userEmail);
        const user = await getUserByEmail(userEmail);
        console.log("new user info: ", user)
        if (user) {
            res.send({ ok: true, user: user })
        } else {
            res.status(400).send({ ok: false, message: `User profile for ${userEmail} was not found` })
        }
    } catch (err) {
        console.log("Error - get user profile: ", err)
    }
}

async function signup(req, res) {
    try {
        const { first_name, last_name, email, password, phone } = req.body
        const newUser = { ...{ first_name, last_name, email, password, phone } }
        const userId = await addNewUser(newUser)
        if (userId) {
            console.log("New userId", userId, "added!")
            res.send({ ok: true, userId: userId })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

function login(req, res) {
    try {
        const { email, password, user } = req.body

        // TODO: consider turning this into a model
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                console.log('email and password verified!')
                // create jwt token and attach to req body
                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );
                req.body.token = token;

                res.send({ ok: true, user: user, token: token })
            } else {
                res.status(400).send("incorrect password")
            }
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const isDeleted = await deleteUserDetails(userId);
        if (isDeleted) {
            console.log('DELETE request, 1 user ousted!')
            res.send({ ok: true, deletedId: userId })
        } else {
            res.status(400).send({ ok: false, message: 'User not found' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

module.exports = { getAllUsers, getSingleUser, signup, deleteUser, login }