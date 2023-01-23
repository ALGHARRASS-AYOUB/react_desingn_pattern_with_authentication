import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../API";
import axios from "axios";
import { toast } from "react-toastify";

const customerContext=createContext();
const CUSTOMERS_URL=getUrl('Customers')

var USER_INFO=null;
var TOKEN=null;

if(localStorage.getItem('userinfo')){
    USER_INFO=JSON.parse(localStorage.getItem('userinfo')).data;

    if(USER_INFO.adminToken){
       TOKEN=USER_INFO.adminToken
    }
    
    if(USER_INFO.userToken){
       TOKEN=USER_INFO.userToken
    }
    
    if(USER_INFO.specialUserToken){
       TOKEN=USER_INFO.specialUserToken
    }
}

// token=(userinfo.adminToken)?userinfo.adminToken:userinfo.userToken;
// token=(token)??userinfo.specialUserToken;

export const useCustomer=()=>{
    const context=useContext(customerContext)
    if(!context) throw new Error('the Customer context does not exist')
    return context;
}
export const CustomerContextProvider=({children})=>{

    //const navigate=useNavigate()
    const [isLoading,setLoading]=useState(false);
    
    
    var getCustomers=async (pageNumber)=>{
        try{
            setLoading(true)            
            var config ={
                headers:{
                    'accept':'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
            const customers = await axios.get(CUSTOMERS_URL+`/customers?page=${pageNumber}`,config)
            .then(res=>{return res.data})
            
            setLoading(false)
            return await customers  ;
        }catch(error){toast.error('an error has been occured while fetching data');}
    }

    const getCustomerById=async (id)=>{
        var config ={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${TOKEN}`,
            },
        }
        try{
            setLoading(true)
            const customer =await axios.get(CUSTOMERS_URL+'/customers',{id},config);

            setLoading(false)
            return customer;
        }catch(Error){toast.error('an error has been occured while fetching data');}
    }

    const storeCustomer=async (name,email,type,address,city,state,postalCode)=>{
        var config ={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${TOKEN}`,
            },
        }
        try{
            setLoading(true)
            const customer =await axios.post(CUSTOMERS_URL+'/customers',{name,email,type,address,city,state,postalCode},config);

            setLoading(false)
            return customer;
        }catch(Error){toast.error('an error has been occured while fetching data');}
    }


    return (<customerContext.Provider value={{ isLoading,setLoading,getCustomers }} >
        {children}
    </customerContext.Provider>)
}
