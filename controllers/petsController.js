const { getPetList, getPetDetails, addNewPet, updatePetDetails, deletePetDetails } = require('../models/petsModels')

async function getAllPets(req, res) {
    try {
        const petList = await getPetList();
        console.log(`GET request, got all pets!`)
        res.send(petList);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function getPets(req, res) {
    try {
        const petId = req.params.id;
        const petDetails = await getPetDetails(petId);
        console.log(`GET 1 pet request!`)
        res.send(petDetails);
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
        res.send(newPet);
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
        const updatedPet = updatePetDetails(petId, petUpdates)
        console.log('PUT request, pet updated!')
        res.send(updatedPet)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function deletePet(req, res) {
    try {
        const petId = req.params.id;
        const isDeleted = await deletePetDetails(petId);
        if (isDeleted) {
            console.log('DELETE request, pet ousted!')
            res.send({ ok: true, deletedId: petId })
        } else {
            res.status(400).send({ok: false, message: 'Pet not found'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

module.exports = { getAllPets, getPets, addPets, updatePets, deletePet }