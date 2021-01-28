var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    writer: String,
    date: {type: Date, default: Date.now},
    content: String,
    community_id: String
})

module.exports = mongoose.model('comment', commentSchema);