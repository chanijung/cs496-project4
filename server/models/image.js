var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    dataUrl: String
})

module.exports = mongoose.model('image', imageSchema);