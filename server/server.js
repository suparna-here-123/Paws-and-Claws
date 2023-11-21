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

const userLoginDetails = mongoose.Schema({
  username : String,
  password : String
})

// ORDER AND NAMING OF THE PROPERTIES MUST BE SAME AS THAT IN YOUR REACT.JS FILE!!!!!!!!
const patientDetails = new mongoose.Schema({
  username : String,
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


const newUserLogin = mongoose.model('users', userLoginDetails);
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

// Define an API endpoint for checking off/deleting patients from appointments collection once checkup donwe
app.delete('/api/appointments/:id', async(req, res)=>{
  try{
    const { id } = req.params
    const result = await newApptForm.findByIdAndDelete(id);
    res.json({message : "Appointment checked off!", result});
  }
  catch(error){
    console.error(error);
    res.status(500).json({error : "internal server error"});
  }
})

// verifies if username doesn't already exist first
app.post('/api/checkUserThenPost', async(req, res)=>{
  let client;
  try{
    
    const userToCheck = new newUserLogin(req.body);

    client = new MongoClient('mongodb://127.0.0.1:27017')

    await client.connect();

    const dbObj = client.db('pet-vet-db')
    const collection = dbObj.collection('users')

    const allUsers = await collection.find({username : userToCheck.username}).toArray();
    if (allUsers.length === 0)    // username not found -> now can post
    {
      await userToCheck.save();
    }
    res.json(allUsers);           // returning the array of users with same username (may/may not be empty)

  }
  catch(error){
    console.error(error);
    res.status(500).json({message : "internal server error"});
  }
})


app.get('/api/verifyUserLogin/:uName/:pwd', async(req, res)=>{

  let userFound;

  try {
    const { uName, pwd } = req.params;

    // connecting to the db
    const client = new MongoClient('mongodb://127.0.0.1:27017')

    await client.connect();

    const dbObj = client.db('pet-vet-db');
    const usersCollection = dbObj.collection('users')

    userFound = await usersCollection.find({username : uName, password : pwd}).toArray();

  }catch(error){
    console.log(error);
  }
  res.json(userFound);

})


//Defining an endpoint for when the client asks for patient details (EDIT PROFILE)
app.get('/api/getProfile/:uName', async(req, res) => {
  try{
    
    const client = new MongoClient('mongodb://127.0.0.1:27017')

    await client.connect();

    const dbObj = client.db('pet-vet-db');
    const patientsCollection = dbObj.collection('patient_details');

    const { uName } = req.params

    const patientFound = await patientsCollection.find({username : uName}).toArray();
    console.log("patient to edit : ", patientFound);
    res.json(patientFound);

  }catch(error){
    console.log(error);
  }
})

app.put('/api/updateProfile/:uName', async(req, res)=>{

  try {

    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect();
    console.log("Connected to db");
    const dbObj = client.db("pet-vet-db");
    const patients = dbObj.collection('patient_details');
  
    const { uName } = req.params
    const filterByField = { username : uName }
    console.log("Update filter : ", filterByField);
  
    console.log("Request body : ", req.body);
  
    const updateOperation = {
      $set : req.body
    };
  
    patients.updateOne(filterByField, updateOperation, (err, result)=>{
      if (err){
        console.error("Error updating docx : ", err);
      }else{
        console.log("Update result : ", res);
        res.status(200).json({message : "Document updated!"});
      }
    client.close();
    })
  }catch(error){
    console.log(error);
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
