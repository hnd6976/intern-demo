import { UserResponse } from "@/shared/interfaces/context.interface";
import {SuccessResponse } from "@/shared/interfaces/country.interface";
import authAPI from "@/utils/authAPI.util";

export const authenticate=(username:string,password:string)=>{
    return authAPI.post<UserResponse>(`/auth/signin`,{username:username,password:password});
   
}
export const signup=(email:string,username:string,password:string)=>{
    return authAPI.post(`/auth/signup`,{email:email,username:username,password:password});
}
