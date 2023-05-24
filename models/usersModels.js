const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dbConnection = require('../db/knex.js'); // SQL db connection
const { send } = require('process');


async function getUserList() {
    // SQL database connection
    try {
        const userList = await dbConnection.from('users');
        return userList;
    } catch (err) {
        console.log(err)
    }
}

async function getUserByEmail(userEmail) {
    try {
        const user = await dbConnection.from('users').where({ email: userEmail }).first()
        return user
    } catch (err) {
        console.log("Model error - getUserByEmail: ", err)
        res.status(500).send(err.message)
    }
}

async function addNewUser(newUser) {
    try {
        const [userId] = await dbConnection('users').insert(newUser);
        return userId
    } catch (err) {
        console.log("Model error - addNewUser: ", err)
    }
}

async function deleteUserDetails(userId) {
    try {
        const isDeleted = await dbConnection.from('users').where({ id: userId }).del();
        return isDeleted
    } catch (err) {
        console.log(err);
    }
}

async function savePetByUser(saveObject) {
    try {
        const [savedId] = await dbConnection.from('saved_pets').insert(saveObject);
        saveObject.id = savedId;
        return saveObject;
    } catch (err) {
        console.log(err);
    }
}

async function isSavedByUser(saveObject) {
    try {
        const saveDetails = await dbConnection.from('saved_pets').where({ pet_id: saveObject.pet_id, user_id: saveObject.user_id }).first();
        console.log('Save exists', saveDetails)
        if (saveDetails.id) {
            return true;
        } else {
            return false
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports = { getUserList, getUserByEmail, addNewUser, deleteUserDetails, savePetByUser, isSavedByUser }