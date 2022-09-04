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
    const { execute, error, isLoading } = useFetch('http://localhost:4000/api/workouts', 'GET', false)

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


    const handleScroll = async (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        console.log('scrolling');
        if (bottom && !isLoading && !reachedBottom) {
            console.log('bottom');
            await execute((data) => {
                if (data.workouts.length == 0) {
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


    useEffect(() => {
        getWorkouts()
    }, [search, getWorkouts])



    return (
        <div className="home" onScroll={handleScroll}>

            <header>

                <div className="brand-logo">
                    <div className="logo"></div>
                    <h1>AZEZ FITNESS</h1>
                </div>

                <div className="spacer"></div>



                <nav>
                    <p>Wellcome , <strong>{`${user.firstName} ${user.lastName}`}</strong></p>

                    <button onClick={logout}>Logout</button>
                </nav>
            </header>



            <section>
                <div className='left'>

                    <input
                        type="text"
                        placeholder='Search...'
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }} />


                    {
                        workouts?.map(workout =>
                            <WorkoutDetails key={workout._id} workout={workout} />
                        )
                    }

                    {reachedBottom && <div>Bottom Reached</div>}
                    {isLoading && <div>Loading...</div>}
                    {error && <div className='error'>{error}</div>}
                </div>

                <div className='right'>
                    <WorkoutForm />
                    <CustomerForm />
                </div>
            </section>



        </div>
    );
}

export default Home;