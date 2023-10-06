const express = require('express');
const { userModel } = require('../model/userModel.js');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const userRouter = express.Router();


userRouter.post('/register', async (req, res) => {
    const { name, email, gender, password, } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user) {
            res.status(200).json({ msg: 'User already present, please login!!!' })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).json({ error: err })
                } else {
                    const newUser = new userModel({ name, email, gender, password: hash })
                    await newUser.save()
                    res.status(200).json({ msg: 'A new user register', User_data: req.body })
                }
            });
        }

    } catch (err) {
        res.status(400).json({ error: err })
    }
})


userRouter.post('/login', async (req, res) => {
    const { email, password, } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ userId: user._id, user: user.name }, 'weblink');
                    res.status(200).json({ msg: 'User has been logged in', token: token })

                } else {
                    res.status(200).json({ msg: 'Incorrect Password'})
                }
            })
        } else {
            res.status(200).json({ msg: 'user not found, Register now' })
        }

    } catch (err) {
        res.status(400).json({ error: err })
    }
})


module.exports = { userRouter }