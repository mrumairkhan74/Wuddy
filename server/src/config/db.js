require('dotenv').config();

const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGO_URI);

db.then(() => {
    console.log('Connected')
})
db.catch((err) => {
    console.error(err)
})

module.exports = db;