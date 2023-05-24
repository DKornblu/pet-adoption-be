const { getPetList, getPetDetails, addNewPet, updatePetDetails, deletePetDetails, getSearchPetList } = require('../models/petsModels')

async function getAllPets(req, res) {
    try {
        const petList = await getPetList();
        console.log(`GET request, got all pets!`)
        res.status(200).send(petList);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function getSearchedPets(req, res) {
    try {
        const qParamsObj = req.query;
        const filteredList = await getSearchPetList(qParamsObj);
        console.log('GET search request!');
        res.status(200).send(filteredList);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function getSinglePets(req, res) {
    try {
        const petId = req.params.id;
        const petDetails = await getPetDetails(petId);
        console.log(`GET 1 pet request!`)
        res.status(200).send(petDetails);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function addPets(req, res) {
    try {
        const newPetReq = req.body;
        const newPet = await addNewPet(newPetReq);
        console.log(`POST request, pet added!`);
        res.status(201).send(newPet);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

// TODO: make async/await like update model
function updatePets(req, res) {
    try {
        const petId = req.params.id;
        const petUpdates = req.body;
        const numOfChanges = updatePetDetails(petId, petUpdates)
        if (numOfChanges > 0) {
            console.log('PUT request, pet updated!')
            res.send({ ok: true, updatedId: petId, updates: numOfChanges })
        } else {
            res.status(400).send({ ok: false, message: 'no updates made' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function deletePets(req, res) {
    try {
        const petId = req.params.id;
        const isDeleted = await deletePetDetails(petId);
        if (isDeleted) {
            console.log('DELETE request, pet ousted!')
            res.send({ ok: true, deletedId: petId })
        } else {
            res.status(400).send({ ok: false, message: 'Pet not found' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

module.exports = { getAllPets, getSearchedPets, getSinglePets, addPets, updatePets, deletePets }