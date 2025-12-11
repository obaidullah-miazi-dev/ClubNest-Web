import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/authProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user ,logOut} = useContext(AuthContext);
  const navigate = useNavigate()
  // console.log(user);
  useEffect(() => {
    const reqInterceptors = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    })


    const resInterceptors = axiosSecure.interceptors.response.use((response)=>{
      return response
    },
    (error)=>{
      console.log(error)
      const statusCode = error.status;
      if(statusCode === 401 || statusCode === 403){
        logOut()
        .then(()=>{
          navigate('/login')
        })
      }
      return Promise.reject(error)
    })

    return () =>{
      axiosSecure.interceptors.request.eject(reqInterceptors)
      axiosSecure.interceptors.response.eject(resInterceptors)
    }
  }, [user,logOut,navigate]);

  return axiosSecure;
};

export default useAxiosSecure;