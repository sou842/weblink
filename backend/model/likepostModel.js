const mongoose = require('mongoose');


const likepostSchema = mongoose.Schema({
    post_id: String,
    liked_date: String,
    liked_time: String,
    userName: String,
    userId: String,
    allLikes: {}
}, {
    versionKey: false
})


const likepostModel = mongoose.model('liked_post', likepostSchema)


module.exports = { likepostModel }