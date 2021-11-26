const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ex1');
        console.log("Connectfully!!")
    } catch (err) {
        console.log("Connect fail!")
    }
}


module.exports = { connect };