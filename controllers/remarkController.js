// remark_index, remark_details, remark_creat_get, remark_create_post, remark_delete
const Remark = require('../models/remark');

const remark_index =  (req, res) => {
    Remark.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('remarks/index', { title: 'All remarks', remarks: result })
        })
        .catch((err) => {
            console.log(err)
        });
}

const remark_creat_get = (req, res) => {
    res.render('remarks/create', { title: 'Create a new remark' });
}

const remark_create_post = (req, res) => {
    const remark = new Remark(req.body);
    remark.save()
        .then((result) => {
            res.redirect('/remarks');
        })
        .catch((err) => {
            console.log(err)
        })
}

const remark_delete = (req, res) => {
    const id = req.params.id;
    Remark.findByIdAndDelete(id)
    .then(result => {
        console.log('deleted')
        res.json(
            { redirect:'/remarks' }
        )
    })
    .catch(err => console.log(err))

}

const remark_details = (req, res) => {
    const id = req.params.id;
    console.log('details is shown')
    Remark.findById(id)
        .then(result => {
            res.render('remarks/details', {remark: result, title: 'remark Details'});
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Remark not found'});
        });

}

module.exports = {
    remark_index,
    remark_creat_get,
    remark_create_post,
    remark_delete,
    remark_details
}