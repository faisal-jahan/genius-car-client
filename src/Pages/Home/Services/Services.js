import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Service from '../Service/Service';
import './Services.css';
import axiosPrivate from './../../../api/axiosPrivate';

const Services = () => {

    // const [services, setServices] = useState([]);

    const getServices = async () =>{
        const {data} = await axiosPrivate.get(`${process.env.REACT_APP_link}/services`)
        return data;
    }

    const {isLoading, isError, data, error} = useQuery("allServices",()=>getServices())

    if(isLoading){
        return <h4>Loading...</h4>
    }

    // useEffect( ()=>{

    //     getServices();
    // }, [])

    return (
        <div id="services" className='container'>
            <div className="row">
            <h1 className='text-primary text-center mt-5'> Our Services</h1>
            <div className="services-container">
            {
                data.map((service,index) => <Service
                    key={index}
                    service={service}
                >
                </Service>)
            }
            </div>
            </div>
        </div>
    );
};

export default Services;