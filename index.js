// import express librarie
const express = require('express')
// initialisation of express variable
const app = express()

/* DEFINITION OF THE RESOURCES
1. create a parking
2. list parkings
3. retrieve details on a particular parking
4. delete a parking
5. book a parking spot
6. list bookings
7. print details on a booking
8. delete a booking
(CRUD: Create, Read, Update, Delete)
*/

/* CREATE ROUTES

For parkings:
1. GET /parkings
2. GET /parkings/:id
3. POST /parkings
4. PUT /parkings/:id
5. DELETE /parkings/:id

For bookings
GET /parkings/:id/bookings
GET /parkings/:id/bookings/:idBooking
POST /parkings/:id/bookings
PUT /parkings/:id/bookings/:idBooking
DELETE /parking/:id/bookings/:idBooking
*/

// require for the parkings list
const parkings = require("./resources/parkings.json")
//require for the bookings list
const bookings = require("./resources/bookings.json")
// add middleware to allow NodeJS to interpret requests body
app.use(express.json())

/*----------------------------------------------------------------------------*/
// METHODS FOR PARKINGS
/*----------------------------------------------------------------------------*/
// GET /parkings function
app.get('/parkings', (req,res) => {
  /* .get method defines a GET route
  .get(STRING, callback) => {} */
  /* callback: (REQUEST,RESULT) => {THINGS TO DO}
  REQUEST: request data
  RESULT: response to request */
    // status is used with a timer to get a feedback on the request
    res.status(200).json(parkings)
})

// GET /parkings/:id function
app.get('/parkings/:id', (req,res) => {
    // get the id's list
    const id = parseInt(req.params.id) // convert the req.param (string) to int
    // array.find() retrieve the first elements that meet the conditions
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})

// POST /parkings function
app.post('/parkings', (req,res) => {
    parkings.push(req.body)
    res.status(200).json(parkings)
})

// PUT /parkings/:id function
app.put('/parkings/:id', (req,res) => {
  /* put method will modify the chosen parameters */
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    // the parameters are placed in the body of the request
    parking.name = req.body.name,
    parking.city = req.body.city,
    parking.type = req.body.type,
    res.status(200).json(parking)
})

// DELETE /parkings/:id/
app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parkings.splice(parkings.indexOf(parking),1)
    res.status(200).json(parkings)
})

/*----------------------------------------------------------------------------*/
// METHOD FOR BOOKINGS
/*----------------------------------------------------------------------------*/
// GET /parkings/:id/bookings
app.get("/parkings/:parkingId/bookings", (req,res) => {
    const parkingId = parseInt(req.params.parkingId)
    // we use array.filter() to retrieve mutliple elements
    const booking = bookings.filter(booking => booking.parkingId === parkingId)
    res.status(200).json(booking)
})

// GET /parkings/:id/bookings/:idBooking function
app.get('/parkings/:parkingId/bookings/:id', (req,res) => {
    const parkingId = parseInt(req.params.parkingId)
    const id = parseInt(req.params.id)
    const booking = bookings.find(booking => (booking.parkingId === parkingId && booking.id === id))
    res.status(200).json(booking)
})

// POST /parkings/:id/bookings function
app.post('/parkings/:parkingId/bookings', (req,res) => {
    const parkingId = parseInt(req.params.parkingId)
    const booking = bookings.find(booking => booking.parkingId === parkingId )
    bookings.push(req.body)
    res.status(200).json(bookings)
})

// PUT /parkings/:id/bookings/:idBooking function
app.put('/parkings/:parkingId/bookings/:id', (req,res) => {
  /* put method will modify the chosen parameters */
    const parkingId = parseInt(req.params.parkingId)
    const id = parseInt(req.param.id)
    const booking = bookings.find(booking => (booking.parkingId === parkingId && booking.id === id))
    // the parameters are placed in the body of the request
    booking.id = req.body.id,
    booking.parking = req.body.parking,
    booking.parkingId = req.body.parkingId,
    booking.clientName = req.body.clientName,
    booking.checkin = req.body.checkin,
    booking.checkout = req.body.checkout,
    res.status(200).json(booking)
})

// DELETE /parking/:id/bookings/:idBooking function
app.delete('/parkings/:parkingId/bookings/:id', (req,res) => {
    const parkingId = parseInt(req.params.parkingId)
    const id = parseInt(req.param.id)
    let booking = bookings.find(booking => (booking.parkingId === parkingId && booking.id === id))
    booking.splice(booking.indexOf(booking.id),1)
    res.status(200).json(booking)
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})
