const mongoose = require('mongoose');

mongoose.connect('mongodb://sinf:fakem6@ds155509.mlab.com:55509/sinf');

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));