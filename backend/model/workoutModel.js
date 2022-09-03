const mongoose = require('mongoose')


const workoutSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "customer", required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true
})


module.exports = mongoose.model('workout', workoutSchema)

