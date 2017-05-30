const mongoose = require('mongoose');
const db = require('./db');

var essaySchema = new mongoose.Schema({
    title: String,
    create_time: Date,
    update_time: Date,
    content: String,
    tag: [String],
    comments: [{
        name: String,
        comment_content: String,
        comment_time: Date,
        reply_id: String
    }]
});

var Essay = mongoose.model('Essay', essaySchema);
module.exports = Essay;
