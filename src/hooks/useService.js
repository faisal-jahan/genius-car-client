import { useEffect, useState } from "react";

const useServices = (serviceId) =>{

    const [service,setService] = useState({});

    useEffect(()=>{
        fetch(`https://cryptic-reaches-45480.herokuapp.com/services/${serviceId}`)
        .then(res=>res.json())
        .then(data=>setService(data))
    },[serviceId])

    return [service,setService];
}

export default useServices;