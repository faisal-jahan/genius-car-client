import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useServices from '../../hooks/useService';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [service,setService] = useServices(serviceId);
    return (
        <div className='container'>
            <div className='d-flex justify-content-center p-3'>
                <h2>You Are About To Book: {service.name}</h2>
            </div>
            <div className='row my-5'>
                <div className='col'>
                    <img className='float-end' src={service.img} alt={service.name} />
                </div>
                <div className='col'>
                    <h3>{parseInt(service.price).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2})}</h3>
                    <p>{service.description}</p>
                </div>
            </div>
            <div className='text-center'>
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-primary'>Proceed Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;