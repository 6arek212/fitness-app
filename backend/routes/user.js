const router = require('express').Router()
const { loginUser, signupUser } = require('../controller/userController')

// login route
router.post('/login', loginUser)


// signup rout
router.post('/signup', signupUser)



module.exports = router