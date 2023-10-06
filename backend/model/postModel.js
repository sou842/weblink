const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    postImage: String,
    postVideo: String,
    postURL: String,
    postDescription: String,
    postDate: String,
    IsPrivate: Boolean,
    userName: String,
    userId: String

}, {
    versionKey: false
})


const postModel = mongoose.model('posts', postSchema)


module.exports = { postModel }