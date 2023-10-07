const express = require('express');
const { postModel } = require('../model/postModel.js');
const { auth } = require('../Auth/auth.js');
const date = require('date-and-time');

const postRouter = express.Router()


postRouter.get('/get', async (req, res) => {

    try {
        const post = await postModel.find({ IsPrivate: false }).sort({ _id: -1 })
        const like = await postModel.aggregate([{ $sort: { _id: -1 } }, { $match: { "IsPrivate": false } }, { $project: { allLikesArray: { $objectToArray: "$allLikes" } } }, { $project: { allLikesLength: { $size: "$allLikesArray" } } }]);

        // console.log(like)
        res.status(200).json({ post, like })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

postRouter.post('/add', auth, async (req, res) => {
    const { userId, userName } = req.body;

    try {
        req.body.postDate = date.format(new Date(), 'DD MMM, YYYY')
        req.body.allLikes = { Weblink: '*' }
        const post = new postModel(req.body)
        await post.save()

        res.status(200).json({ msg: 'Post Added Successfully', 'post': req.body })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

postRouter.patch('/liked', auth, async (req, res) => {
    const { like_id, userId } = req.body

    try {
        const like = await postModel.findOne({ _id: like_id })

        if (like['allLikes'][userId] == undefined) {
            like['allLikes'][userId] = '*'
        } else {
            delete like['allLikes'][userId]
        }

        await postModel.findByIdAndUpdate({ _id: like_id }, like)
        res.status(200).json({ msg: 'The post has been updated...' })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})




postRouter.patch('/update/:PostId', auth, async (req, res) => {
    const userIdCheck = req.body.userId;
    const { postId } = req.params;

    try {
        const post = await postModel.findOne({ _id: postId })
        const userPostId = post.userId;

        if (userIdCheck == userPostId) {
            const updatepost = await postModel.findByIdAndUpdate({ _id: postId }, req.body)
            res.status(200).json({ msg: 'The post has been updated...', updatepost })
        } else {
            res.status(200).json({ msg: 'user not authorize' })
        }
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

postRouter.delete('/delete/:PostId', auth, async (req, res) => {
    const userIdCheck = req.body.userId;
    const { postId } = req.params;

    try {
        const post = await postModel.findOne({ _id: postId })
        const userPostId = post.userId;

        if (userIdCheck == userPostId) {
            const updatepost = await postModel.findByIdAndDelete({ _id: postId })
            res.status(200).json({ msg: 'The post has been updated...', updatepost })
        } else {
            res.status(200).json({ msg: 'user not authorize' })
        }
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})


module.exports = { postRouter }