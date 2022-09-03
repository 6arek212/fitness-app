const router = require('express').Router()
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controller/workoutController')
const requireAuth = require('../middleware/requireAuth')

//require auth for all routes
router.use(requireAuth)

router.get('/', getWorkouts)

router.get('/:id', getWorkout)

router.post('/', createWorkout)

router.patch('/:id', updateWorkout)

router.delete('/:id', deleteWorkout)

module.exports = router