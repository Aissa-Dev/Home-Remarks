const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Remark = require('./models/remark');
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

app.get('/remarks', (req, res) => {
    Remark.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All remarks', remarks: result })
        })
        .catch((err) => {
            console.log(err)
        });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/remarks/create', (req, res) => {
    res.render('create', { title: 'Create a new remark' });
});

app.post('/remarks/create', (req, res) => {
    const remark = new Remark(req.body);
    remark.save()
        .then((result) => {
            res.redirect('/remarks');
        })
        .catch((err) => {
            console.log(err)
        })
});

app.delete('/remark/:id', (req, res) => {
    const id = req.params.id;
    Remark.findByIdAndDelete(id)
    .then(result => {
        res.json(
            {
                redirect:'/remarks'
            }
        )
    })
    .catch(err => console.log(err))

});

app.get('/remarks/:id', (req, res) => {
    const id = req.params.id;
    Remark.findById(id)
        .then(result => {
            res.render('details', {remark: result, title: 'remark Details'});
        })
        .catch(err => {
            console.log(err)
        });

});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
