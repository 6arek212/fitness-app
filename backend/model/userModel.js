const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})



// statiac signup method
userSchema.statics.signup = async function ({ phone, firstName, lastName, password }) {

    //validation
    if (!phone || !password || !firstName || !lastName) {
        throw Error('All fileds must be filled')
    }

    // if (!validator.isStrongPassword(password)) {
    //     throw Error('Password is not strong enough')
    // }


    const exists = await this.findOne({ phone: phone })
    if (exists) {
        throw Error('Phone already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ phone, password: hash, firstName, lastName })

    return user
}


// statiac login method
userSchema.statics.login = async function (phone, password ) {

    //validation
    if (!phone || !password) {
        throw Error('All fileds must be filled')
    }

    const user = await this.findOne({ phone: phone })
    if (!user) {
        throw Error('Invalid credentials')
    }

    const match = await bcrypt.compare(password, user.password)


    if (!match)
        throw Error('Invalid credentials')

    return user
}


module.exports = mongoose.model('user', userSchema)