const express = require('express');
const Remark = require('../models/remark');
const router = express.Router();

router.get('/', (req, res) => {
    Remark.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All remarks', remarks: result })
        })
        .catch((err) => {
            console.log(err)
        });
});


router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new remark' });
});

router.post('/create', (req, res) => {
    const remark = new Remark(req.body);
    remark.save()
        .then((result) => {
            res.redirect('/remarks');
        })
        .catch((err) => {
            console.log(err)
        })
});

router.delete('/:id', (req, res) => {
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

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Remark.findById(id)
        .then(result => {
            res.render('details', {remark: result, title: 'remark Details'});
        })
        .catch(err => {
            console.log(err)
        });

});

module. exports = router;