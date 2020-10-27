const mongoose = require('mongoose');

const {Schema} = mongoose;

const CommnetSchema = new Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    dishId: {
        type: Schema.Types.ObjectId,
        required: true,
        // ref: 'Dish'
    }

}, {timestamps: true});

module.exports = mongoose.model('Commnet', CommnetSchema);
