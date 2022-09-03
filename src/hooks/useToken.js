import axios from "axios";
import { useEffect, useState } from "react"

const useToken = (user) =>{

    const [token,setToken] = useState('');

    useEffect(()=>{
        const getToken = async () =>{
            const {data} = await axios.post(`${process.env.REACT_APP_link}/login`,{user});

            setToken(data.accessToken);
            localStorage.setItem('accessToken',data.accessToken);
        }
        getToken();  

    },[user])

    return [token];

}

export default useToken;