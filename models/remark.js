const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remarkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Remark = mongoose.model('Remark', remarkSchema);
module.exports = Remark;