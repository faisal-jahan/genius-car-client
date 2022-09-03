import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Orders = () => {


    const [orders,setOrders] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const getOrders = async() =>{
        const {data} = await axiosPrivate.get(`https://cryptic-reaches-45480.herokuapp.com/orders?email=${user.email}`);
        return data;
    }

    const {isLoading, isError, data} = useQuery("orders",()=>getOrders());

    console.log(data);
    if(isLoading){
        return <h2>Loading...</h2>
    }

    // useEffect(()=>{

    //     const getOrders = async () =>{
    //         const {data} = await axiosPrivate.get(`http://localhost:5000/orders?email=${user.email}`,{

    //         });
    //         setOrders(data)
    //     }
    //     getOrders();

    // },[user])

    const update = (id) =>{
        navigate(`/orders/${id}`);
    }

    const remove = (id) =>{

        const confirm = window.confirm(`Are You Sure You Want To Delete ${id}`)

        if(confirm){

            fetch(`https://cryptic-reaches-45480.herokuapp.com/orders/${id}`,{
                method:'Delete'
            })
            .then(res=>res.json())
            .then(data=>console.log(data))
        }
    }


    return (
        <div className='container'>
                        <table className='table'>
                <thead>
                    <tr className='text-center'>
                        <th scope='col'>Serial</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Service Name</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Phone</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((order,index)=>

                            <tr key={index}>
                                <th scope='row' className='align-middle'>{index+1}</th>
                                <td className='align-middle'>{order.name}</td>
                                <td className='align-middle'>{order.email}</td>
                                <td className='align-middle'>{order.serviceName}</td>
                                <td className='align-middle'>{order.address}</td>
                                <td className='align-middle'>{order.phone}</td>
                                <td className='align-middle'>
                                    <button onClick={() => update(order._id)} className='btn btn-primary mb-1 mr-1'>Edit</button>
                                    <button onClick={()=>remove(order._id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>

                            )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Orders;