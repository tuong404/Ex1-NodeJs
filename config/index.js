const mongoose = require('mongoose');

connect().catch(err => console.log(err));

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ex1');
        console.log("Connectfully!!")
    } catch (err) {
        console.log("Connect fail!")
    }
}


module.exports = { connect };