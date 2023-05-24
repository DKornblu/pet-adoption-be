const bcrypt = require('bcrypt')
const { getUserByEmail } = require("../models/usersModels")

async function isNewUser(req, res, next) {
    const user = await getUserByEmail(req.body.email)
    if (user) {
        return res.status(400).send('user already exists')
    }
    next()
}

function encryptPwd(req, res, next) {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds,
        (err, hash) => {
            if (err) {
                res.status(500).send(err.message)
            } else {
                console.log("hashed pwd: ", hash)
                req.body.password = hash
                next()
            }
        })
}

async function doesUserExist(req, res, next) {
    try {
        const userEmail = req.body.email;
        const user = await getUserByEmail(userEmail);
        if (!user) {
            return res.status(400).send('user does not exist :P')
        }
        req.body.user = { ...user }; // add user profile to req.body
        next()
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

function auth(req, res, next){

}

module.exports = { doesUserExist, isNewUser, encryptPwd }