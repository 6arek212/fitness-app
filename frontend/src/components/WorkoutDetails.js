
import moment from 'moment'
import { useFetch } from '../hooks/useFetch'
import { useWorkoutContext } from '../hooks/useWorkoutContext'


const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext()
    const { execute, isLoading, error } = useFetch('http://localhost:4000/api/workouts/' + workout._id, 'DELETE', false)

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
            <span className="material-symbols-outlined" onClick={onDelete} >delete</span>
        </div>
    );
}

export default WorkoutDetails;