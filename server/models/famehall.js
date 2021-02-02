var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var famehallSchema = new Schema({
    team: [String],
    projectName: String,
    gitUrl: String,
    year: String,
    data: String
})

module.exports = mongoose.model('famehall', famehallSchema);