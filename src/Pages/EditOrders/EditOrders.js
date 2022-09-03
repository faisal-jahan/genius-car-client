import { async } from '@firebase/util';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const EditOrders = () => {

    const [user, loading, error] = useAuthState(auth)
    const [order,setOrder] = useState({});
    const { register, handleSubmit } = useForm({
        defaultValues:{
            name:order.name,
            email:order.email,
            serviceName:order.serviceName,
            address:order.address,
            phone:order.phone,
        }
    })    
    
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{

        const getOrders = async () =>{
        await axios.get(`https://cryptic-reaches-45480.herokuapp.com/orders/${id}`)
        .then(data=>setOrder(data.data))
        }
        getOrders();

    },[order]
    )

    const onSubmit = (data,e) =>{
        data.name = e.target.name.value;
        data.email = e.target.email.value;
        data.serviceName = e.target.serviceName.value;
        data.address = e.target.address.value;
        data.phone = e.target.phone.value;
 
        axios.put(`https://cryptic-reaches-45480.herokuapp.com/orders/${id}`,data)
        .then(data=>{
            if(data.data.acknowledged){
                toast('updated Data');
                navigate('/orders');
                console.log(data.data)
            }
        })
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                Name: <input {...register('name',{onChange:(e)=>console.log(e)})} defaultValue={order.name} type="text" disabled={user.displayName?"true":"false"}/><br/>
                Email: <input {...register('email')} defaultValue={order.email} type="text"  disabled={user.email?"true":"false"}/><br/>
                Service Name: <input {...register('serviceName')} defaultValue={order.serviceName} type="text" /><br/>
                Address: <input {...register('address')} defaultValue={order.address} type="text" /><br/>
                Phone: <input {...register('phone')} defaultValue={order.phone} type="text" /><br/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default EditOrders;