import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useServices from '../../../hooks/useService';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useEffect } from 'react';
import { useState } from 'react';
import { async } from '@firebase/util';
import axios from 'axios';
import { toast} from 'react-toastify';

const Checkout = () => {

    const { id } = useParams();
    const [service,setService] = useServices(id);
    const [user, loading, error] = useAuthState(auth);
    const [serviceName, setServiceName] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({
        defaultValues:{
            name:user.displayName,
            email:user.email,
            serviceName:service.name,
        }
    });

    const onSubmit = (data,e) =>{
        const serviceName = e.target.serviceName.value?e.target.serviceName.value:service.name;
        data.serviceName = serviceName;
        
        axios.post(`${process.env.REACT_APP_link}/orders`,data)
        .then(data=>{
            if(data.data){
                toast(data.data)
                navigate('/orders')
            }
        })
    }
    
    return (
        <div>
            <div className='container text-center'>
                <h2>Please Checkout your booking, and confirm: <br/>{service.name}</h2>
            </div>
            <div className='w-100 d-flex justify-content-center'>
                {/* <form>
                    <input className='w-100 mb-2' value={user.displayName} name='name' placeholder='Name' type="text" required/><br/>
                    <input className='w-100 mb-2' value={user.email} name='email' placeholder='email' type="email" /><br/>
                    <input className='w-100 mb-2' name='address' placeholder='address' type="text" /><br/>
                    <input className='w-100 mb-2' name='phone' placeholder='phone' type="text" /><br/>
                    <input className='w-100 mb-2' name='serviceName' value={service.name} placeholder='Service Name' type="text" /><br/>
                    <button className='btn btn-primary' type='submit'>Place Order</button>
                </form> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('name')} className='w-100 mb-2' placeholder='Name' type="text" disabled={user.displayName?"true":"false"}/><br/>
                    <input {...register('email')} className='w-100 mb-2' placeholder='email' type="email" disabled={user.displayName?"true":"false"}/><br/>
                    <input {...register('address')} className='w-100 mb-2' placeholder='address' type="text" /><br/>
                    <input {...register('phone')} className='w-100 mb-2' placeholder='phone' type="text"/><br/>
                    <input {...register('serviceName')} defaultValue={service.name} className='w-100 mb-2' placeholder="Service Name" type="text" /><br/>
                    <button className='btn btn-primary' type='submit'>Place Order</button>
                </form>
            </div>

        </div>
    );
};

export default Checkout;