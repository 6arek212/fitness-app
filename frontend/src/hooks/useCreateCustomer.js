import { useState } from 'react'
import useAuthContext from './useAuthContext'
import { useFetch } from './useFetch'

export const useCreateCustomer = () => {
    const { execute, isLoading, error } = useFetch('/customers', 'POST', false)
    const { token } = useAuthContext()

    const create = async (phone, firstName, lastName) => {
        await execute(null, { firstName, lastName, phone })
    }

    return { create, isLoading, error }
}

