const fs = require('fs');
const path = require('path');
const pathToPetsDB = path.resolve(__dirname, '../db-mock/MockPets.json')
const { v4: uuidv4 } = require('uuid');
const petsDb = require('../db-mock/MockPets.json'); // mock db
const dbConnection = require('../db/knex.js') // SQL db connection

async function getPetList() {
    // connection to SQL db
    try {
        const petList = await dbConnection.from('pets');
        return petList;
    } catch (err) {
        console.log(err)
    }

    // before SQL connection
    // const petListJson = fs.readFileSync(pathToPetsDB, 'utf8')
    // const petList = JSON.parse(petListJson)
    // return petList
}

async function getPetDetails(petId) {
    // connection to SQL db
    try {
        const petDetails = await dbConnection.from('pets').where({ id: petId })
        return petDetails;
    } catch (err) {
        console.log(err)
    }

    // before SQL
    // const petList = getPetList();
    // const petIndex = petList.findIndex(pet => pet.id == petId);
    // const petDetails = petList[petIndex];
    // return petDetails;
}

async function addNewPet(newPet) {
    // connection to SQL db
    try {
        const [petId] = await dbConnection.from('pets').insert(newPet); // returns db table primary id
        newPet.id = petId; // db automatically give an id, update append id to the new pet in the FE
        return newPet;
    } catch (err) {
        console.log(err)
    }

    // before SQL connection
    // const newPetWithId = {
    //     ...newPet,
    //     id: uuidv4()
    // }
    // const petList = getPetList();
    // petList.push(newPetWithId);

    // fs.writeFile(pathToPetsDB, JSON.stringify(petList), err => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log('Pet added successfully!');
    // });
    // return newPetWithId
}

async function updatePetDetails(petId, petUpdates) {
    // TODO: SQL db cnxn
    const petList = await getPetList()
    const petIndex = petList.findIndex(pet => pet.id == petId);
    const updatedPet = {
        ...petList[petIndex],
        ...petUpdates
    }
    petList[petIndex] = updatedPet;

    // before SQL connection
    // const petList = getPetList()
    // const petIndex = petList.findIndex(pet => pet.id == petId);
    // const updatedPet = {
    //     ...petList[petIndex],
    //     ...petUpdates
    // }
    // petList[petIndex] = updatedPet;
    // fs.writeFile(pathToPetsDB, JSON.stringify(petList), err => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log('Pet updated successfully!');
    // });
    // return updatedPet
}

async function deletePetDetails(petId) {
    // TODO: connect to SQL database
    try {
        const isDeleted = await dbConnection.from('pets').where({id: petId}).del();
        return isDeleted;
        // const petList = await getPetList();
    } catch (err) {
        console.log(err);
    }

    // Before SQL
    // const petList = getPetList()
    // const newPetList = petList.filter(pet => pet.id !== petId);
    // fs.writeFile(pathToPetsDB, JSON.stringify(newPetList), err => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log('Pet deleted successfully!');
    // });
    // return true;
}

module.exports = { getPetList, getPetDetails, addNewPet, updatePetDetails, deletePetDetails }