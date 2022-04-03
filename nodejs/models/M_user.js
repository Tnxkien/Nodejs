const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true, default: ''},
    email: {type: String, unique: true, default: ''},
    phone: {type: String, unique: true, default: ''},
    avatar: {type: String, default: ''},
    role: {type: String, default: ''},
    status: {type: Boolean, default: false},
    trash: {type: Boolean, default: false},
    date_created: {type: Date, default: Date.now()},
    date_updated: {type: Date, default: null}
})

module.exports = mongoose.model('user', userSchema);