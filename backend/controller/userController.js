const User = require('../model/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}



exports.loginUser = async (req, res, next) => {
    const { phone, password } = req.body

    try {
        let user = await User.login(phone, password)

        //create token
        const token = createToken(user._id)

        res.status(200).json({
            message: 'login sucess',
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone
            },
            token , 
            expiresIn: 3 * 24 * 60 * 60 
        })
    } catch (e) {
        next(e)
    }
}



exports.signupUser = async (req, res, next) => {
    const { firstName, lastName, phone, password } = req.body
    console.log(phone , password);

    try {
        const user = await User.signup({ firstName, lastName, phone, password })

        //create token
        const token = createToken(user._id)

        res.status(201).json({
            message: 'signup sucess',
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone
            },
            token
        })
    } catch (e) {
        next(e)
    }
}

