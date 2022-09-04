import moment from "moment";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import CustomDialog from "./CustomDialog";



const CustomerDetails = ({ customer }) => {
    const [open, setOpen] = useState(false);
    const { execute: executeDelete, isLoading: isLoadingDelete, error: errorDelete } = useFetch('/customers/' + customer._id, 'DELETE', false)

    const onDeleteCustomer = async () => {
        console.log('aaa');
        setOpen(false)
        await executeDelete()
    }

    return (
        <tr className='customer-details'>

            <td>{`${customer.firstName} ${customer.lastName}`}</td>
            <td>{customer.phone}</td>
            <td>{moment(customer.createdAt).format('LL')}</td>
            <td><span className="material-symbols-outlined" onClick={() => { setOpen(!open) }}>delete</span></td>

            <td style={{display:'none'}}>
                <CustomDialog
                    title={'Delete Customer'}
                    description={`Are you sure you want to delete ${customer.firstName} ${customer.lastName} ?`}
                    onConfirm={onDeleteCustomer}
                    onCancel={() => { setOpen(false) }}
                    isOpen={open}
                />
            </td>
        </tr>
    );
}

export default CustomerDetails;