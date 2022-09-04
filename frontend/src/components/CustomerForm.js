import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

const CustomerForm = () => {
    const [phone, setPhone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const { execute, isLoading, error } = useFetch('/customers', 'POST', false)


    const onCreate = async (e) => {
        e.preventDefault()
        await execute(() => {
            setPhone('')
            setFirstName("")
            setLastName('')
        }, { phone, firstName, lastName })
    }

    return (
        <form className="customer-form" onSubmit={onCreate}>
            <h3>Add Customer</h3>

            <label>First Name:</label>
            <input
                type="text"
                onChange={(e) => { setFirstName(e.target.value) }}
                value={firstName}
            />


            <label>Last Name:</label>
            <input
                type="text"
                onChange={(e) => { setLastName(e.target.value) }}
                value={lastName}
            />


            <label>Phone:</label>
            <input
                type="text"
                onChange={(e) => { setPhone(e.target.value) }}
                value={phone}
            />


            <button disabled={isLoading}>Add Customer</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default CustomerForm;