const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    comment: String,
    postId: String,
    time: String,
    date: String,
    userName: String,
    userId: String,
}, {
    versionKey: false
})


const commentModel = mongoose.model('comments', commentSchema)


module.exports = { commentModel }