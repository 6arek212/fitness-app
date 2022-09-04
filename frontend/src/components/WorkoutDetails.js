
import moment from 'moment'
import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import CustomDialog from './CustomDialog'


const WorkoutDetails = ({ workout }) => {
    const [open, setOpen] = useState(false)
    const { dispatch } = useWorkoutContext()
    const { execute, isLoading, error } = useFetch('/workouts/' + workout._id, 'DELETE', false)

    const onDelete = async (e) => {
        e.preventDefault()

        await execute(() => {
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: { _id: workout._id }
            })
        })
    }

    return (
        <div className="workout-details">
            <h4>{`${workout.customer.firstName} ${workout.customer.lastName}`}</h4>
            <p><strong>Description:</strong> {workout.description}</p>
            <p>{moment(workout.date).fromNow()}</p>
            <span className="material-symbols-outlined" onClick={() => { setOpen(!open) }} >delete</span>

            <CustomDialog
                title={'Delete Workout'}
                description={`Are you sure you want to delete ${workout.customer.firstName} ${workout.customer.lastName} workout ?`}
                onConfirm={onDelete}
                onCancel={() => { setOpen(false) }}
                isOpen={open}
            />
        </div>
    );
}

export default WorkoutDetails;