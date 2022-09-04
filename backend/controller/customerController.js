const Customer = require('../model/customerModel')
const Workout = require('../model/workoutModel')
const mongoose = require('mongoose')

exports.getCustomers = async (req, res, next) => {

    const page = + req.query.page
    const pageSize = + req.query.pageSize
    const { search } = req.query

    console.log('-------------------------------', page, pageSize);

    const query = Customer.find()

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

        query.where({ _id: customer?._id })
    }



    if (page && pageSize) {
        query.skip(pageSize * (page - 1)).limit(pageSize)
    }


    const customers = await query.sort({ createdAt: 'desc' })
    const count = await Customer.count()

    res.status(200).json({
        message: 'fetched customers success',
        customers,
        count
    })
}



exports.getCustomer = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'id is not valid'
        })
    }

    const customer = await customer.findById(id)

    if (!customer) {
        return res.status(404).json({
            message: 'customer was not found'
        })
    }

    res.status(200).json({
        message: 'fetch success',
        customer
    })
}




exports.createCustomer = async (req, res, next) => {
    const { firstName, lastName, phone } = req.body
    console.log(req.body);
    try {
        const exists = await Customer.findOne({ phone: phone })
        if (exists) {
            throw Error('Phone already in use')
        }

        const customer = await Customer.create({
            firstName,
            lastName,
            phone
        })

        res.status(200).json({
            message: 'customer created',
            customer
        })
    }
    catch (e) {
        next(e)
    }
}



exports.updateCustomer = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'id is not valid'
        })
    }


    const customer = await Customer.findOneAndUpdate({ _id: id }, { ...req.body }, { runValidators: true, returnOriginal: false })

    if (!customer) {
        return res.status(404).json({
            message: 'customer was not found'
        })
    }


    res.status(200).json({
        message: 'customer was updated',
        customer
    })

}




//delete customer
exports.deleteCustomer = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'id is not valid'
        })
    }


    await Workout.deleteMany({ customer: id })
    const result = await Customer.deleteOne({ _id: id })

    if (result.deletedCount == 0) {
        return res.status(404).json({
            message: 'customer was not found'
        })
    }

    res.status(200).json({
        message: 'customer was deleted '
    })
}