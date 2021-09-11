const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const remarkRoutes = require('./routes/remarkRoutes');
require('dotenv').config();



// Express app
const app = express();

//connect to mongodb
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
    .then((result) => { console.log('Connected'); app.listen(3005); })
    .catch((err) => { console.log(err) });
//register view angine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));// fro post request object... ex : req.body
app.use(morgan('dev'));



//routes
app.get('/', (req, res) => {
    res.redirect('/remarks');
});


app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//remarks routes

app.use('/remarks',remarkRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
