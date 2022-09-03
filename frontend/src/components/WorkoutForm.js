import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useFetch } from "../hooks/useFetch";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
    const [customer, setCustomer] = useState('-1')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const { data, isLoading: isLoadingCustomers, error: errorCustomer } = useFetch('http://localhost:4000/api/customers')
    const { execute, isLoading, error } = useFetch('http://localhost:4000/api/workouts', 'POST', false)
    const { dispatch } = useWorkoutContext()
    const { token } = useAuthContext()


    const onCreatingWorkout = async (e) => {
        e.preventDefault()

        // if (!token) {
        //     // setError('You must be logged in')
        //     return
        // }
        const workout = { customer, description, date }
        await execute((result) => {
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: result.workout
            })
        }, workout)

    }



    return (
        <div className="workout-form" >

            <form onSubmit={onCreatingWorkout}>
                <h3>Add A New Workout</h3>

                <label>Customer:</label>
                <select value={customer} onChange={(e) => setCustomer(e.target.value)}>

                    <option value={'-1'}>Pick Customer..</option>

                    {data?.customers.map(customer =>
                        <option key={customer._id} value={customer._id}>{`${customer.firstName} ${customer.lastName}`}</option>
                    )}


                </select>


                <label>Description:</label>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />


                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button disabled={isLoading || isLoadingCustomers}>Add Workout</button>

                {errorCustomer && <div className="error">{errorCustomer}</div>}
                {error && <div className="error">{error}</div>}

            </form>

        </div>
    );
}

export default WorkoutForm;