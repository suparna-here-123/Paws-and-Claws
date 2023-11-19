// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to MongoDB database - THIS IS FOR ALL THE POST REQUESTS THAT COME IN
mongoose.connect('mongodb://127.0.0.1:27017/pet-vet-db');


// Define a Mongoose schema
// Schema is a blueprint of structure of the data you are going to store

// ORDER AND NAMING OF THE PROPERTIES MUST BE SAME AS THAT IN YOUR REACT.JS FILE!!!!!!!!
const patientDetails = new mongoose.Schema({
  petName : String,
  petBreed : String,
  petSpecies : String,
  petAge : String,
  parentName : String,
  parentPh : String
});

const apptForm = new mongoose.Schema({
  date : String,
  time : String,
  reason : String
});
// Create a Mongoose model
// A model creates an instance of a document(record)
// the first argument will be the name of the instance and its lowercase, pluralised form will be the collection name as well
// second argument is the structure it will follow

const newPatient = mongoose.model('patient_details', patientDetails, 'patient_details');
const newApptForm = mongoose.model('appointments', apptForm);

// Define an API endpoint for user registration (FOR USERS)
app.post('/api/register', async (req, res) => {
  try {
    const newPatientDetails = new newPatient(req.body);
    await newPatientDetails.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POSTING APPOINTMENTS
app.post('/api/postAppt', async(req, res)=>{
  try{
      const newAppt = new newApptForm(req.body);
      await newAppt.save();
      res.status(201).json({message : 'Appointment Booked!'});
  }
  catch(error){
    console.error(error);
    res.status(500).json({message : 'Internal Server Error!'});
  }
})


// Define an API endpoint for data retrieval (FOR DOC TO SEE APPOINTMENTS)
app.get('/api/patients', async(req, res)=>{

  let client;
  try{
    // creating new mongoClient instance
    client = new MongoClient('mongodb://127.0.0.1:27017')

    // connecting
    await client.connect();

    console.log("connected to db");

    const dbObj = client.db('pet-vet-db');
    const collection = dbObj.collection("appointments");

    const today = new Date();
    actualToday = today.toISOString().split('T')[0]
    //console.log(actualToday);

    const patientsToday = await collection.find({date : actualToday}).sort().toArray();
    console.log(patientsToday);
    
    //if (patientsToday == [])

    res.json(patientsToday);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error : 'internal server error'});
  }
  finally{
    client.close();
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
