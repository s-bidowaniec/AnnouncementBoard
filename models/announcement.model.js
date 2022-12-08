const mongoose = require('mongoose')

const announcementsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: String, required: true},
    photo: {type: String, required: true},
    price: {type: String, required: true},
    location: {type: String, required: true},
    seller: {type: String, required: true}
});

module.exports = mongoose.model('Announcement', announcementsSchema);
