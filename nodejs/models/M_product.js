const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    slug: {type: String, require: true, unique: true},
    id_parent: {type: mongoose.Types.ObjectId, default: null},
    id_user: {type: mongoose.Types.ObjectId, default: null},
    price: {type: Number, default: 0},
    img: {type: String, default: ''},
    content: {type: String, default: ''},
    status: {type: Boolean, default: false},
    trash: {type: Boolean, default: false},
    date_created: {type: Date, default: Date.now()},
    date_updated: {type: Date, default: null}
})

module.exports = mongoose.model('product', productSchema);