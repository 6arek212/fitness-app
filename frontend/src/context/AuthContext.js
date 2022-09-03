import { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext()


export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...action.payload
            }

        case 'LOGOUT':
            return { user: null, token: null }

        default: return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null
    })

    console.log('Auth Context state', state);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = JSON.parse(localStorage.getItem('token'))

        if (user && token) {
            dispatch({
                type: 'LOGIN',
                payload: { user, token }
            })
        }

    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
