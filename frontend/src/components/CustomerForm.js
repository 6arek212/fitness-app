import { useState } from "react";
import { useCreateCustomer } from '../hooks/useCreateCustomer'

const CustomerForm = () => {
    const [phone, setPhone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const { create, error, isLoading } = useCreateCustomer()


    const onCreate = async (e) => {
        e.preventDefault()
        try {
            await create(phone, firstName, lastName)
        }
        catch (e) {
            console.log(e);
        }
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