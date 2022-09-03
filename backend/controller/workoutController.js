const Workout = require('../model/workoutModel')
const Customer = require('../model/customerModel')
const mongoose = require('mongoose')


// get all workouts
exports.getWorkouts = async (req, res, next) => {
    const page = + req.query.page
    const pageSize = + req.query.pageSize
    const { search } = req.query

    console.log('-------------------------------',page, pageSize);

    const query = Workout.find()

    if (search) {
        const customer = await Customer.findOne(
            {
                $or: [
                    {
                        "$expr": {
                            "$regexMatch": {
                                "input": { "$concat": ["$firstName", " ", "$lastName"] },
                                "regex": search,  //Your text search here
                                "options": "i"
                            }
                        }

                    },
                    { 'phone': { $regex: "^" + search } }
                ]
            }
        )

        query.where({ customer: customer?._id })
    }



    if (page && pageSize) {
        query.skip(pageSize * (page - 1)).limit(pageSize)
    }


    const workouts = await query.sort({ createdAt: 'desc' })
        .populate('customer', 'firstName lastName phone')

    res.status(200).json({
        message: 'fetch success',
        workouts
    })
}



// get single workout
exports.getWorkout = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'id is not valid'
        })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({
            message: 'workout was not found'
        })
    }

    res.status(200).json({
        message: 'fetch success',
        workout
    })
}




//create new workout 
exports.createWorkout = async (req, res, next) => {

    const { customer, description, date } = req.body

    // let emptyFields = []

    // if (!title) {
    //     emptyFields.push('title')
    // }

    // if (!reps) {
    //     emptyFields.push('reps')
    // }

    // if (!load) {
    //     emptyFields.push('load')
    // }

    // if (emptyFields.length > 0) {
    //     return res.status(400).json({
    //         message: 'Please fill in all the fields',
    //         emptyFields
    //     })
    // }

    try {
        const _workout = await Workout.create({
            customer,
            description,
            date
        })

        const workout = await Workout.populate(_workout, { path: "customer" })

        res.status(200).json({
            message: 'workout inserted',
            workout
        })
    }
    catch (e) {
        next(e)
    }

}




//update workout 
exports.updateWorkout = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'id is not valid'
        })
    }


    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { runValidators: true, returnOriginal: false })

    if (!workout) {
        return res.status(404).json({
            message: 'workout was not found'
        })
    }


    res.status(200).json({
        message: 'workout was updated',
        workout
    })
}



//delete workout
exports.deleteWorkout = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'id is not valid'
        })
    }

    const result = await Workout.deleteOne({ _id: id })

    if (result.deletedCount == 0) {
        return res.status(404).json({
            message: 'workout was not found'
        })
    }

    res.status(200).json({
        message: 'Workout was deleted '
    })
}