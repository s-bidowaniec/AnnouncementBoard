const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: true},
    phoneNumber: {type: String, required: true}
});

module.exports = mongoose.model('User', usersSchema);
