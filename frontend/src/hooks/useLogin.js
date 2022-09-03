import { useState } from "react";
import useAuthContext from "./useAuthContext";



const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (phone, password) => {
        setLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, password })
        })

        const json = await response.json()


        if (!response.ok) {
            setLoading(false)
            setError(json.message)
            return
        }

        //save the use to loact storage
        localStorage.setItem('user', JSON.stringify(json.user))
        localStorage.setItem('token', JSON.stringify(json.token))

        // update auth context
        dispatch({
            type: 'LOGIN',
            payload: { user: json.user, token: json.token }
        })

        setLoading(false)
    }

    return { login, isLoading, error }
}

export default useLogin;