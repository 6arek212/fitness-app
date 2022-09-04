import useAuthContext from "./useAuthContext";
import { useFetch } from "./useFetch";



const useLogin = () => {
    const { execute, data, isLoading, error } = useFetch('/users/login', 'POST', false)
    const { dispatch } = useAuthContext()

    const login = async (phone, password) => {

        await execute((json) => {
            //save the use to loact storage
            localStorage.setItem('user', JSON.stringify(json.user))
            localStorage.setItem('token', JSON.stringify(json.token))

            // update auth context
            dispatch({
                type: 'LOGIN',
                payload: { user: json.user, token: json.token }
            })
        }, { phone, password })
    }

    return { login, isLoading, error }
}

export default useLogin;