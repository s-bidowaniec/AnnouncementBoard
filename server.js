const express = require('express');
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const sanitize = require('mongo-sanitize');
const helmet = require('helmet');
const announcementsRoutes = require('./routes/announcements.routes')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connect DB
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = `mongodb+srv://${process.env.dbname}:${process.env.dbpass}@cluster0.f63nfzn.mongodb.net/?retryWrites=true&w=majority`;
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/AnnouncementBoardDBtest';
else dbUri = 'mongodb://localhost:27017/AnnouncementBoardDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', ()=>{
    console.log('Connected to the database')
})
db.on('err', err => {console.log(`Error:  ${err}`)})
// Start server
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

// security
app.use((req, res, next) => {
    req.body = sanitize(req.body);
    req.params = sanitize(req.params);
    next();
})
app.use(helmet());

// use routes
app.use('/api', announcementsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Serve main react app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Handle bad requests
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

// export
module.exports = server;