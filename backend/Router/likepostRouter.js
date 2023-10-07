const express = require('express');
const { likepostModel } = require('../model/likepostModel.js');
const { auth } = require('../Auth/auth.js');
const date = require('date-and-time');

const likepostRouter = express.Router()


likepostRouter.get('/', auth, async (req, res) => {
    const { userId } = req.body;

    try {
        const post = await likepostModel.find({ IsPrivate: false }).sort({ _id: -1 })
        res.status(200).json({ msg: post })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

// likepostRouter.post('/liked/', auth, async (req, res) => {

//     try {
//         req.body.liked_date = date.format(new Date(), 'DD MMM, YYYY')

//         const post = new likepostModel(req.body)
//         await post.save()
//         res.status(200).json({ msg: 'Post Added Successfully', 'post': req.body })

//     } catch (err) {
//         res.status(400).json({ error: err.massage })
//     }
// })

likepostRouter.patch('/liked', auth, async (req, res) => {
    const { like_id, userId } = req.body

    try {
        const like = await likepostModel.findOne({ _id: like_id })

        if (like['allLikes'].userId==undefined){
            like['allLikes'].userId = 'like'
        } else{
            delete like['allLikes'].userId
        }
        
        await likepostModel.findByIdAndUpdate({ _id: like_id }, like)
        res.status(200).json({ msg: 'The post has been updated...' })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

likepostRouter.delete('/delete/:PostId', auth, async (req, res) => {
    const userIdCheck = req.body.userId;
    const { postId } = req.params;

    try {
        const post = await likepostModel.findOne({ _id: postId })
        const userPostId = post.userId;

        if (userIdCheck == userPostId) {
            const updatepost = await likepostModel.findByIdAndDelete({ _id: postId })
            res.status(200).json({ msg: 'The post has been updated...', updatepost })
        } else {
            res.status(200).json({ msg: 'user not authorize' })
        }
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})


module.exports = { likepostRouter }