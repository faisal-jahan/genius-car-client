import { useEffect, useState } from "react";

const useServices = (serviceId) =>{

    const [service,setService] = useState({});

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_link}/services/${serviceId}`)
        .then(res=>res.json())
        .then(data=>setService(data))
    },[serviceId])

    return [service,setService];
}

export default useServices;