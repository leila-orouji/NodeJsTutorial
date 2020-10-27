const mongoose = require('mongoose');
const {Schema} = mongoose;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const DishSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    label:{
        type: String,
        default: ''
    },
    price:{
        type: Currency,
        required: true, 
        min: 0
    },
    featured:{
        type: Boolean,
        default: false
    }
    // comments: [commentShema]
}, {timestamps: true, toJSON: {virtuals: true}});

DishSchema.virtual('/comments', {
    ref: 'Commnet',
    localField: '_id',
    foreignField: 'dishId'
})

module.exports = mongoose.model('Dish', DishSchema);
