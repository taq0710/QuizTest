import { ILogin, ILoginSocial, ISignUp } from "@/interface";
import { axiosRequest } from "@/utils/axiosRequest";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const factories = {
  requestLogin:(data:ILogin)=>{
    return axios({
      method:"post",
      url:`${url}auth/login`,
      data:data
    })
  },
  requestLoginSocial:(data:ILoginSocial)=>{
    return axios({
      method:"post",
      url:`${url}auth/login-by-social`,
      data:data
    })
  },
  requestSignUp:(data:ISignUp)=>{
    return axios({
      method:"post",
      url:`${url}auth/register`,
      data:data
    })
  },
  getUserInfo:()=>{
    return axiosRequest({
      method: "get",
      url: `users/profile`,
    });
  },
}
export default factories;