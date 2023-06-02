// ___________________
// Database
// ___________________
const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE_URL;

// Connect to Mongo
mongoose.connect(mongoURI);

// Error / Disconnection
const db = mongoose.connection

//Adding event listeners to the Mongoose connection to make sure we are good
db.on('connected', function() {
  console.log(`Connected to MongoDB:${mongoURI}, dbname=${db.name} at host=${db.host} on port= ${db.port}`);
});
db.on("open", () => console.log("Connected to Mongoose"))
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on("close", () => console.log("Disconnected from Mongoose"))
db.on('disconnected', () => console.log('mongo disconnected'))