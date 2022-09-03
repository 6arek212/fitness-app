const router = require('express').Router()
const {getCustomers , getCustomer , createCustomer , deleteCustomer , updateCustomer} = require('../controller/customerController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/', getCustomers)

router.get('/:id', getCustomer)

router.post('/', createCustomer)

router.patch('/:id', updateCustomer)

router.delete('/:id', deleteCustomer)


module.exports = router