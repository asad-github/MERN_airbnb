import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext=createContext({})

export function UserContextProvider({children}){
    const [user,setuser]=useState(null)
    const [ready,setready]=useState(false)
    const token=localStorage.getItem('token')
    useEffect(()=>{
        if(!user){
            axios.get('/users/profile',{
                headers:{
                    'Authorization':token
                }
            }).then(({data})=>{
                setuser(data)
                // setready(true)
            })
        }
    },[])
    return (
        <UserContext.Provider value={{user,setuser}}>
            {children}
        </UserContext.Provider>
    )
}