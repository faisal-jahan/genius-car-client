import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {

        fetch('http://localhost:5000/services',{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data){
                reset();
            }
            else{
                console.log(data)
            }
        })
    }

    return (
        <div>
            <div className='container d-flex mx-auto justify-content-center my-3'>
                <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('name')} placeholder='Service Name' />
                    <input {...register('price')} placeholder='Service Price' />
                    <input {...register('description')} placeholder='Service Description' />
                    <input {...register('img')} placeholder='Photo URL' />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddService;