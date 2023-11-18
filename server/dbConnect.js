// Import the MongoDB client
const MongoClient = require("mongodb").MongoClient;

// MongoDB connection URI
var url = "mongodb://127.0.0.1:27017/pet-vet-db";

// Connect to MongoDB
MongoClient.connect(url, function(err, client){
  if (err){console.log("Error occurred : ", err);}
  
  var dbObject = client.db("pet-vet-db");
  console.log("connection made");

  var patients = [{"petName" : "Sunil", "species" : "Cat", "breed" : "stray", "age" : 3, "ownerName" : "Suparna", "ownerTel" : 8839192949},
  {"petName" : "Caesar", "species" : "Dog", "breed" : "Labrador", "age" : 6, "ownerName" : "Akshay", "ownerTel" : 1739010394}];

  dbObject.collection("users").insertMany(patients, function(err,res){
    if (err) {console.log("insertion error : ", err);}
    console.log("2 docx inserted");
    client.close();
  })
})