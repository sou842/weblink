var jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        try {
            var decoded = jwt.verify(token, 'weblink')

            if (decoded) {
                req.body.userId = decoded.userId
                req.body.user = decoded.user
                next()
            } else {
                res.status(200).json({ msg: 'user is not authorize' })
            }

        } catch (err) {
            res.status(400).json({ error: err.massage })
        }
    } else {
        res.status(200).json({ msg: 'Login Now!!!' })
    }
}

module.exports = { auth }