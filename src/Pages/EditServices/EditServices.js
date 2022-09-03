import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditServices = () => {
    const [service,setService] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        defaultValues:{
            name:service.name,
            price:service.price,
            description:service.description,
            img:service.img
        }
    });
    
    useEffect(()=>{
        fetch(`https://cryptic-reaches-45480.herokuapp.com/services/${id}`)
        .then(res=>res.json())
        .then(data=>setService(data))
    },[])

    const onSubmit = (data,e) => {

        data.name = e.target.name.value;
        data.price = e.target.price.value;
        data.description = e.target.description.value;
        data.img = e.target.img.value;

        fetch(`https://cryptic-reaches-45480.herokuapp.com/services/${id}`,{
            method:'put',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data),
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0){
                toast('Updated Value');
                navigate('/manage-services')
                console.log(data)
            }
            else{
                toast('No Updates Made');
                navigate('/manage-services')
                console.log(data)
            }
        })
    };


    return (
        <div className='container'>
            <div className='d-flex justify-content-center'>
                <h1>{service.name}</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex justify-content-center flex-column'>
                <input {...register('name')} className='mb-1' type="text" defaultValue={service.name} />
                <input {...register('price')} className='mb-1' type="text" defaultValue={service.price} />
                <input {...register('description')} className='mb-1' type="text" defaultValue={service.description} />
                <input {...register('img')} className='mb-1' type="text" defaultValue={service.img} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default EditServices;