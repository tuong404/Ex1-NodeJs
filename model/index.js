const mongoose = require('mongoose');
const { Schema } = mongoose;
const Users = new Schema({
    id: Number,
    username: String,
    password: String,
    name: String,
    age: Number,
    role: String,
});

module.exports = mongoose.model('Users', Users);