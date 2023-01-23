import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../API";
import axios from "axios";
import { toast } from "react-toastify";
const authContext=createContext();
export const useAuth=()=>{
    const context=useContext(authContext)
    if(!context) throw new Error('Auth provider does not exist')
    return context;
}
        
let AUTH_URL=getUrl('Auth');

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
//console.log(USER_INFO);
export const AuthContextProvider=({children})=>{
  const navigate=useNavigate();
    const [isLoading,setLoading   ]=useState(false  )

    

    // attempt for login
    const login=async (email,password)=>{

        const config={
            header:{
                'content-type':'application/json',
            },
        };
        try{
            setLoading(true)
            const userinfo=await axios.post(AUTH_URL+'/login',{email,password},config);
            console.log(userinfo)
            localStorage.setItem('userinfo',JSON.stringify(userinfo.data));
            setLoading(false)
            return userinfo;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }
        // registeration


    const register=async ({name,email,password,role})=>{
        try{
            setLoading(true)
            const config={
                header:{
                    'content-type':'application/json',
                },
            };
            const userinfo=await axios.post(`${AUTH_URL}+/register`,{name,email,password,role},config);
            console.log(userinfo)
            localStorage.setItem('userinfo',JSON.stringify(userinfo));
            setLoading(false)
            return userinfo;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }
    }

    const logout=async()=>{
        try {
            setLoading(true)
       
            var config={
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${TOKEN}`,
                },
            };

            // axios.interceptors.request.use(
            //     config=>{
            //         config.headers.authorization=`Bearer ${TOKEN}`
            //         return config
            //     },error=>{return Promise.reject(error)}
            // )

            const res=await axios.post(`${AUTH_URL}/logout`,null,config);
                localStorage.removeItem('userinfo');
            setLoading(false)
            return res;
        } catch (error) {
            toast.error('an error has been occured while logging out ')
        }
    }

return (
    // the return the created context createdcontext.provider"""
    // the value prop is like we would export those data.
    <authContext.Provider 
    value={{ USER_INFO,isLoading,setLoading,login,register,logout }}> 
        {children}
    </authContext.Provider>
)
    

}













