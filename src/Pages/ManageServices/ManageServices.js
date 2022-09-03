import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';

const ManageServices = () => {

    const [services,setServices] = useState([]);

    const navigate = useNavigate();

    const getServices = async() =>{
        const {data} = await axiosPrivate.get(`${process.env.REACT_APP_link}/services`);
        return data; 
    }

    const {isLoading, isError, data, error} = useQuery("services",()=>getServices());

    // useEffect(()=>{
    //     const getServices = async() =>{
    //         const {data} = await axiosPrivate.get('http://localhost:5000/services');
    //         setServices(data); 
    //     }
    //     getServices();
    // },[])

    if(isLoading){
        return <h4>Loading....</h4>
    }

    const update = (id) =>{
        navigate(`/manage-services/${id}`);
    }

    const remove = (id) =>{

        const confirm = window.confirm(`Are You Sure You Want To Delete ${id}`)

        if(confirm){

            fetch(`${process.env.REACT_APP_link}/services/${id}`,{
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
                        <th scope='col'>Description</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((service,index)=>

                            <tr key={index}>
                                <th scope='row' className='align-middle'>{index+1}</th>
                                <td className='align-middle'>{service.name}</td>
                                <td className='align-middle'>{service.description}</td>
                                <td className='align-middle'>{parseInt(service.price).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2})}</td>
                                <td className='align-middle'>
                                    <button onClick={() => update(service._id)} className='btn btn-primary mb-1 mr-1'>Edit</button>
                                    <button onClick={()=>remove(service._id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>

                            )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageServices;