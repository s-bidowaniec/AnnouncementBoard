const express = require('express');
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const sanitize = require('mongo-sanitize');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Connect DB
const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);
let dbUri = '';

if(NODE_ENV === 'production') dbUri = `mongodb+srv://${process.env.dbname}:${process.env.dbpass}@cluster0.f63nfzn.mongodb.net/?retryWrites=true&w=majority`;
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/AnnouncementBoardDBtest';
else dbUri = 'mongodb://localhost:27017/AnnouncementBoardDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const app = express();

app.use(
  cors({
      origin: ['http://localhost:3000', 'http://localhost:8000', 'https://announcementboard.s-bidowaniec.repl.co', 'https://kodilla-annoncements.herokuapp.com'],
      credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', 1);

app.use(session({
    secret: process.env.secretSession,
    store: MongoStore.create({ mongoUrl: dbUri }),
    resave: false,
    saveUninitialized: false,
    cookie: {secure: process.env.NODE_ENV === 'production'}
}));

db.once('open', ()=>{
    console.log('Connected to the database')
})
db.on('err', err => {console.log(`Error:  ${err}`)})

// security
app.use((req, res, next) => {
    req.body = sanitize(req.body);
    req.params = sanitize(req.params);
    next();
})
app.use(helmet({crossOriginResourcePolicy: false}));

// use routes
app.use('/api', require('./routes/announcements.routes'));
app.use('/auth', require('./routes/auth.routes'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Serve public images
app.use(express.static(path.join(__dirname, '/public')));

// Serve main react app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Handle bad requests
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})
// Start server
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});
// export
module.exports = app;
