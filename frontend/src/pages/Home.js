import { Scroll, useCallback, useEffect, useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm';
import useAuthContext from '../hooks/useAuthContext';
import { useFetch } from '../hooks/useFetch';
import useLogout from '../hooks/useLogout';
import { useWorkoutContext } from '../hooks/useWorkoutContext'

const pageSize = 10

const Home = () => {
    const [reachedBottom, setReached] = useState(false)
    const [search, setSearch] = useState('')
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const { workouts, page, dispatch } = useWorkoutContext()
    const { execute, error, isLoading } = useFetch('/workouts', 'GET', false)

    const getWorkouts = useCallback(() => {
        execute((data) => {
            if (data.workouts.length < pageSize && data.workouts.length > 0) {
                setReached(true)
            }
            dispatch({
                type: 'SET_WORKOUTS',
                payload: data?.workouts
            })
            setReached(false)
        }, null, { search, page, pageSize })

    }, [dispatch, execute, search])





    useEffect(() => {
        getWorkouts()
    }, [search, getWorkouts])


    useEffect(() => {
        const handleScroll = async () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10 && !isLoading ) {
                console.log("you're at the bottom of the page");

                await execute((data) => {
                    if (data.workouts.length < pageSize) {
                        setReached(true)
                    }
                    else
                        dispatch({
                            type: 'NEXT_PAGE',
                            payload: data?.workouts
                        })
                }, null, { search: search, page: page + 1, pageSize })
            }
        }

        // window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener("scroll", handleScroll) }
    }, [])

    return (
        <div className="home">

            <WorkoutForm />

            <div className="search">
                <input
                    type="text"
                    placeholder='Search...'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }} />
            </div>

            {workouts?.map(workout => <WorkoutDetails key={workout._id} workout={workout} />)}

            {reachedBottom && <div>Bottom Reached</div>}
            {isLoading && <div>Loading...</div>}
            {error && <div className='error'>{error}</div>}
        </div>
    );
}

export default Home;