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

const AUTH_URL=getUrl('Auth');

const USER_INFO=localStorage.getItem('userinfo')?localStorage.getItem('userinfo'):null;
console.log(USER_INFO);
export const AuthContextProvider=({children})=>{
    const navigate=useNavigate();
    const [isLoading,setLoading   ]=useState(false  )


    // attempt for login
    const login=async(email,password)=>{

        const config={
            header:{
                'content-type':'application/json',
            },
        };
        try{
            setLoading(true)
            const userinfo=await axios.post(`${AUTH_URL}+/login`,{email,password},config);
            console.log(userinfo)
            localStorage.setItem('userinfo',JSON.stringify(userinfo));
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
        const TOKEN=''
          if(USER_INFO.adminToken){
             TOKEN=USER_INFO.adminToken
          }
          
          if(USER_INFO.userToken){
             TOKEN=USER_INFO.userToken
          }
          
          if(USER_INFO.specialUserToken){
             TOKEN=USER_INFO.specialUserToken
          }
            const config={
                header:{
                    'content-type':'application/json',
                    'Authorization':`Bearer ${TOKEN}` 
                },
            };
            const res=await axios.post(`${AUTH_URL}+/logout`,null,config);
                localStorage.removeItem();
            setLoading(false)
        } catch (error) {
            toast.error('an error has been occured while logging out ')
        }
    }


    

}














function Fetch({ render, url,postdata,config }) {

  const [state, setState] = useState({
    data: {},
    isLoading: false
  });

  useEffect(() => {
    setState({ data: {}, isLoading: true });

    const _fetch = async () => {
      const res = await axios.post(url,postdata,config);
      const json = await res.json();

      setState({
        data: json,
        isLoading: false,
      });
    }

    _fetch();
  }, );

  return render(state);
}



