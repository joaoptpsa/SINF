const express = require('express');
const mongoose = require('mongoose');
const models = require('./models');

var app = express();

mongoose.connect('mongodb://sinf:fakem6@ds155509.mlab.com:55509/sinf');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));