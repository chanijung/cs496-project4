var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var archiveSchema = new Schema({
    week: String,
    subject: String,
    url: String
})

module.exports = mongoose.model('archive', archiveSchema);