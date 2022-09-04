import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import CustomerForm from "../components/CustomerForm";

import CustomerDetails from "../components/CustomerDetails";

const customers = [
    { firstName: 'Tarik', lastName: 'a', createdAt: '2/3/2019' },
    { firstName: 'Azez', lastName: 'dd', createdAt: '2/3/2019' },
    { firstName: 'Mohammed', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tammer', lastName: 'cv', createdAt: '2/3/2019' },
    { firstName: 'Ibraa', lastName: 'asd', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
    { firstName: 'Tarik', lastName: 'Husin', createdAt: '2/3/2019' },
]


const pageSize = process.env.REACT_APP_DEFAULT_PAGE || 10

const Customers = () => {
    const [search, setSearch] = useState('')
    const { execute, data, isLoading, error } = useFetch('/customers')

    let page = 1


    const onSearch = async () => {
        await execute(null, null, { pageSize: pageSize, page: page, search })
    }

 

    useEffect(() => {
        onSearch()
    }, [search])

    return (
        <div className="customers">

            <div className="stats">

                <div className="card">
                    <div className="logo"></div>
                    <p>Total Clients</p>
                    <h3>{data?.count}</h3>
                </div>

            </div>

            <CustomerForm />

            <div className="search">
                <input
                    className="search"
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />

                <button className="default-button" onClick={onSearch}>Search</button>
            </div>


            <table className="list">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Phone</th>
                        <th>Joined</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {
                        data?.customers.map(customer => (
                            <CustomerDetails customer={customer} key={customer._id}/>
                        ))
                    }

                </tbody>
            </table>


        </div>
    );
}

export default Customers;