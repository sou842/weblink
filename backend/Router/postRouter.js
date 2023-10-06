const express = require('express');
const { postModel } = require('../model/postModel.js');
const { auth } = require('../Auth/auth.js');


const postRouter = express.Router()


postRouter.get('/',auth, async (req, res) => {
    const {userId} = req.body;

    try {
        const post = await postModel.find()
        res.status(200).json({msg:post})

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

postRouter.post('/add',auth, async (req, res) => {

    try {
        const post = new postModel(req.body)
        await post.save()
        res.status(200).json({msg:'new post added','new_post':post})

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

postRouter.patch('/update/:PostId',auth,async(req,res)=>{
    const userIdCheck = req.body.userId;
    const {postId} = req.params;

    try{
        const post = await postModel.findOne({_id:postId})
        const userPostId = post.userId;

        if(userIdCheck == userPostId){
            const updatepost = await postModel.findByIdAndUpdate({_id:postId},req.body)
            res.status(200).json({msg:'The post has been updated...',updatepost})
        } else{
            res.status(200).json({msg:'user not authorize'})
        }
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

postRouter.delete('/delete/:PostId',auth,async(req,res)=>{
    const userIdCheck = req.body.userId;
    const {postId} = req.params;

    try{
        const post = await postModel.findOne({_id:postId})
        const userPostId = post.userId;

        if(userIdCheck == userPostId){
            const updatepost = await postModel.findByIdAndDelete({_id:postId})
            res.status(200).json({msg:'The post has been updated...',updatepost})
        } else{
            res.status(200).json({msg:'user not authorize'})
        }
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})


module.exports = { postRouter }