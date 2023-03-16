import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import logo from './Photos/Airbnb-mobile.jpg'
import search from './Photos/sea.png'
import world_icon from './Photos/world-icon.png'

export default function Navbar(){
    const {user}=useContext(UserContext)
    const [srch,set_srch]=useState('')
    function handleChange(event){
        const {name,value}=event.target
        set_srch(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    function search_place(event){
        event.preventDefault()
        console.log(srch)
    }
    return(
        <header className="flex items-center -mt-6 justify-around">
            <Link to={'/'}>
                <img src={logo} alt="airbnb-logo" className="h-20 mb-1 -ml-10 w-52"/>
            </Link>
            <div className="flex border rounded-lg">
                <input type='text' placeholder="Anywhere" className="py-2 px-2 w-80 rounded-lg" onChange={handleChange} name='search'/>
                <button onClick={search_place}><img src={search} className='h-6 mr-2'/></button>
            </div>
            <div className="italic ml-40  mt-2 mb-2">  Airbnb your Home  </div>
            <img src={world_icon} alt="airbnb-logo" className="h-10 -m-3 mr-60"/>
            <Link to={user? '/account/profile':'/login'} className=" flex border rounded-full p-2 w-30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-6 pr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            {
                !!user && (
                    <div>
                        {user.username.split(' ').slice(0,-1).join(' ')}
                    </div>
                )
            }
            </Link>
        </header>
    )
}