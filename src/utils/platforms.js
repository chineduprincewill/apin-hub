import axios from "axios";
const API_BASE = import.meta.env.VITE_BASE_URL || "https://api.example.com";

export const fetchPlatforms = async ( setPlatforms, setError, setIsLoading ) => {

    setIsLoading(true);
    try{
        //console.log(token)
        const response  = await axios.get(`${API_BASE}/platforms`,
            {
                headers: { 
                    'Accept' : 'application/json', 
                    'Content-Type' : 'application/json'
                }
            }
        );    
        //console.log(response.data);
        setPlatforms(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setIsLoading(false);
}

export const managePlatforms = async ( token, setPlatforms, setError, setIsLoading ) => {

    setIsLoading(true);
    try{
        //console.log(token)
        const response  = await axios.get(`${API_BASE}/manage-platforms`,
            {
                headers: { 
                    'Accept' : 'application/json', 
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            }
        );    
        //console.log(response.data);
        setPlatforms(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setIsLoading(false);
}

export const platformCategories = async ( token, setCategories, setError, setIsLoading ) => {

    setIsLoading(true);
    try{
        //console.log(token)
        const response  = await axios.get(`${API_BASE}/platform-categories`,
            {
                headers: { 
                    'Accept' : 'application/json', 
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            }
        );    
        //console.log(response.data);
        setCategories(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setIsLoading(false);
}

export const createPlatform = async ( token, data, setSuccess, setError, setUpdating ) => {

    setUpdating(true);
    try{
        //console.log(token)
        const response  = await axios.post(`${API_BASE}/platforms`,
            data,
            {
                headers: { 
                    'Accept' : 'application/json', 
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            }
        );    
        //console.log(response.data);
        setSuccess(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setUpdating(false);
}

export const platformStatusUpdate = async ( token, data, setSuccess, setError, setUpdating ) => {

    setUpdating(true);
    try{
        //console.log(token)
        const response  = await axios.post(`${API_BASE}/update-platform-status`,
            data,
            {
                headers: { 
                    'Accept' : 'application/json', 
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            }
        );    
        //console.log(response.data);
        setSuccess(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setUpdating(false);
}