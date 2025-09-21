require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
}))



module.exports = app