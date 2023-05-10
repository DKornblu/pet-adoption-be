const express = require('express') // import express functionality for building server
const cors = require('cors') // import cors module MW func for domain request control 
const dbConnection = require("./db/knex.js")


const PORT = process.env.PORT || 8080 // define PORT from .env OR 8080
const app = express() // create inst of express BE server

// global MW - run before every req
app.use(cors())
app.use(express.json()) //parse incoming JSON
app.use(express.urlencoded()) //parse incoming URL encoded data

// import pets and users routes
const petsRoute = require('./routes/petsRoute')
const usersRoute = require('./routes/usersRoute')

// Before splitting into routes, components, models:
// ROUTE app.get('/pets', COMPONENT (req, res) => {
//     try {
//           MODEL
//     res.send('this is a full explicit route example')
//     } catch (err) {
//         res.status(500).send(err.message)
//     }
// })

// global MW for directing reqs to particular routes
app.use('/pets', petsRoute) // for any req with /pets
app.use('/users', usersRoute) // for any req with /users

// connect to db, & if connected the server can start listening
dbConnection.migrate.latest() // run latest db migration
    .then((migration) => {
        if (migration) { // if successful, server listen
            console.log('migration connected to DB', migration);
            app.listen(PORT, () => {
                console.log(`Listening on port: ${PORT}`)
            }); // starts server listening for incoming messages on PORT, the log is an optional callback to verify it's working
        }
    })
    .catch(err => console.log('error connecting to DB: ', err));