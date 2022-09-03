const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ message: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = await jwt.verify(token, process.env.SECRET)
        req.user = _id
        next()
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Request is not authorized' })
    }
}

module.exports = requireAuth