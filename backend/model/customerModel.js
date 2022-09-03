const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
})




module.exports = mongoose.model('customer', customerSchema)