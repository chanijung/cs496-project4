var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    uid: String,
    pwd: String,
    name: String,
    semester: String,
    classNum: Number
})

module.exports = mongoose.model('user', userSchema);