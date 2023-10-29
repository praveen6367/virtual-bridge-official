const mongoose = require('mongoose');
const { Schema } = mongoose;

const shoppingSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    image: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('shopping', shoppingSchema);