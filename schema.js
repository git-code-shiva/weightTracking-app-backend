const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightSchema = new Schema({
    weight:Number,
    unit:String
},{timestamps:true});

const weightModel = mongoose.model('unlockFit', weightSchema)
module.exports = weightModel;