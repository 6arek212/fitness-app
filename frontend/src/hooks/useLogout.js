import useAuthContext from '../hooks/useAuthContext'


const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // remove use from storage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        dispatch({
            type: 'LOGOUT'
        })
    }

    return { logout }
}

export default useLogout;