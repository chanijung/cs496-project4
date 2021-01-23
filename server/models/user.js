var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    uid: String,
    name: String,
    semester: String,
    class: Number
})

module.exports = mongoose.model('user', userSchema);