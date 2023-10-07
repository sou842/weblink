const express = require('express');
const { connection } = require('./db.js');
const { userRouter } = require('./Router/userRouter.js');
const { postRouter } = require('./Router/postRouter.js');
const { likepostRouter } = require('./Router/likepostRouter.js');

var cors = require('cors')



const app = express()
app.use(express.json());
app.use(cors())
app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/liked_post',likepostRouter)


app.listen(8080,async()=>{

    try{
        await connection;
        console.log('The port is running at the port 8080')
    } catch(err){
        console.log(err)
    }
})