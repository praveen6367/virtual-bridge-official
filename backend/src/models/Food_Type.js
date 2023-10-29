const mongoose = require('mongoose');
const {Schema} = mongoose;

const foodTypeSchema = new Schema({
   
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

module.exports = mongoose.model('FoodType', foodTypeSchema);