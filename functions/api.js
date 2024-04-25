const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');

const app= express();

const dbCloudUrl =
'mongodb+srv://jenelricafrente:<password>@cluster0.6kvjvok.mongodb.net/';

const dbLocalUrl = 'mongodb://Jen/serverless-ai';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose
.connect(dbCloudUrl || dbLocalUrl)
.then(() => console.log('Connecter to MongoDB'))
.catch((error) => console.error('Failed to connect to mongoDB', error));

app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app);