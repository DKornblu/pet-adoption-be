const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dbConnection = require('../db/knex.js') // SQL db connection

async function getPetList() {
    try {
        const petList = await dbConnection.from('pets');
        return petList;
    } catch (err) {
        console.log(err)
    }
}

async function getSearchPetList(qParamsObj) {
    try {

        // dbConnection.from('pets').where('key','value').where('key','value')...
        let searchQuery = dbConnection.from('pets')

        const qParamsEntriesArray = Object.entries(qParamsObj); // turns object into array of key/value arrays

        qParamsEntriesArray.forEach(([key, value]) => {
            if (key === 'minHeight') {
                searchQuery = searchQuery.where('height', '>', value);
            } else if (key === 'maxHeight') {
                searchQuery = searchQuery.where('height', '<', value);
            } else if (key === 'minWeight') {
                searchQuery = searchQuery.where('weight', '>', value);
            } else if (key === 'maxWeight') {
                searchQuery = searchQuery.where('weight', '<', value);
            } else {
                searchQuery = searchQuery.where(key, value);
            }
        });
        // // iterate method 2
        // for (let i = 0; i < qParamsEntriesArray.length; i++) {
        //     searchQuery = searchQuery.where(`${qParamsEntriesArray[i][0]}`, `${qParamsEntriesArray[i][1]}`);
        // }
        // // iterate method 3
        // for (let key in qParamsObj) {
        //     searchQuery = searchQuery.where(key, qParamsObj[key]);
        // }

        const filteredList = await searchQuery;
        return filteredList;
    } catch (err) {
        console.log(err)
    }
}

async function getPetDetails(petId) {
    try {
        const petDetails = await dbConnection.from('pets').where({ id: petId }).first() //send first onbject in the array
        return petDetails;
    } catch (err) {
        console.log(err)
    }
}

async function addNewPet(newPet) {
    try {
        const [petId] = await dbConnection.from('pets').insert(newPet); // returns db table primary id
        newPet.id = petId; // db automatically give an id, update append id to the new pet in the FE
        return newPet;
    } catch (err) {
        console.log(err)
    }
}

async function updatePetDetails(petId, petUpdates) {
    try {
        const numOfChanges = await dbConnection.from('pets').where({ id: petId }).update({ ...petUpdates });
        return numOfChanges;
    } catch (err) {
        console.log(err)
    }
}

async function deletePetDetails(petId) {
    try {
        const isDeleted = await dbConnection.from('pets').where({ id: petId }).del();
        return isDeleted;
        // const petList = await getPetList();
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getPetList, getPetDetails, addNewPet, updatePetDetails, deletePetDetails, getSearchPetList }