import { useState } from 'react'
import useAuthContext from './useAuthContext'

export const useCreateCustomer = () => {
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const { token } = useAuthContext()

    const create = async (phone, firstName, lastName) => {
        setLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({ firstName, lastName, phone })
        })

        const json = await response.json()


        if (!response.ok) {
            setError(json.message)
        }
        setLoading(false)
    }

    return { create, isLoading, error }
}

