const express = require('express');
const { connection } = require('./db.js');
const { userRouter } = require('./Router/userRouter.js');
const { postRouter } = require('./Router/postRouter.js');
const { commentRouter } = require('./Router/commentRouter.js');

var cors = require('cors')



const app = express()
app.use(express.json());
app.use(cors())
app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/comments',commentRouter)


app.listen(8080,async()=>{

    try{
        await connection;
        console.log('The port is running at the port 8080')
    } catch(err){
        console.log(err)
    }
})