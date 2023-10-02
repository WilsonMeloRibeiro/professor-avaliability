require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const router = require('./routes/routes');
const url = '3333';
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json());
app.use(router);

app.listen(url, ()=>{
    mongoose.connect(process.env.DATABASE_URI)
    console.log(`Runnig at port ${url}`)
});