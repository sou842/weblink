const { commentModel } = require('../model/commentModel.js');
const { auth } = require('../Auth/auth.js');
const express = require('express');
const date = require('date-and-time');

const commentRouter = express.Router()


commentRouter.get('/get/:postId', async (req, res) => {
    const { postId } = req.params

    console.log(postId)
    try {
        const comment = await commentModel.find({ postId }).sort({ _id: -1 })

        res.status(200).json(comment)

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

commentRouter.post('/add', auth, async (req, res) => {

    console.log(req.body)

    try {
        req.body.date = date.format(new Date(), 'D MMM, YYYY')

        const comment = new commentModel(req.body)
        await comment.save()

        res.status(200).json({ msg: 'Comment Send', 'Comment': req.body })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})



module.exports = { commentRouter }