const mongoose = require('mongoose');
const {Schema} = mongoose;

const foodSchema = new Schema({
    image:{
        type: String,
        required: true
    },

    title:{
        type: String,
        required: true
    },

    description:{
         type: String,
         required: true
    },

    rating:{
        type:String,
        required: true
    },

    price:{
        type:String,
        required: true
    },

    discount:{
        type: String,
    },

    type:{
        type: String,
        require:true
    },
    
    date: {
        type: Date,
        default: Date.now,
        required:true
    }
});

module.exports = mongoose.model('Food', foodSchema);