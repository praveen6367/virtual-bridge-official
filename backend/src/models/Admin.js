const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    rpassword: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);