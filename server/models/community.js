var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var communitySchema = new Schema({
    writer: String,
    date: {type: Date, default: Date.now},
    type: Number,
    title: String,
    content: String
})

module.exports = mongoose.model('community', communitySchema);