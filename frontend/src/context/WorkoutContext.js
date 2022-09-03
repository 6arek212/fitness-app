import { createContext, useReducer } from 'react'


export const WorkoutsContext = createContext()


export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload,
                page: 1
            }

        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts],
                page: state.page
            }

        case 'NEXT_PAGE':
            return {
                workouts: [...state.workouts, ...action.payload],
                page: state.page + 1
            }


        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload._id),
                page: state.page
            }

        default:
            return state
    }
}

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null,
        page: 1
    })


    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
}
