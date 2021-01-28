var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    semester: String,
    classNum: Number,
    team: [String],
    projectName: String,
    gitUrl: String,
    detail: String,
    votes: Number
})

module.exports = mongoose.model('project', projectSchema);