import axios from "axios"
import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../UserContext"

export default function Login() {
    const [form,setform]=React.useState({
        email:'',
        password:''
    })
    const [redirect,setredirect]=React.useState(false)
    const {setuser}=useContext(UserContext)
    function handleChange(event){
        const {name,value}=event.target
        setform(prevdata=>{
            return{
                ...prevdata,
                [name]:value
            }
        })
    }
    async function handleSubmit(event){
        event.preventDefault()
        const {email,password}=form
        try {
            const {data}=await axios.post('/users/login',{
                email,password
            })
            localStorage.setItem('token',data.token)
            setuser(data.userDoc)
            alert('login successful')
            setredirect(true)
        } catch (error) {
            alert('login failed, try again later')
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <div id="login-page">
            <div className="form-cont">
                <h1>Login to airbnb</h1>
                <div>
                    <form className="form" onSubmit={handleSubmit}>
                        <input type='text' placeholder="youremail@_.com" className="input" value={form.email} onChange={handleChange} name='email'></input>
                        <input type='password' placeholder="password" className="input" value={form.password} onChange={handleChange} name='password'></input>
                        <button className="btn">Login</button>
                    </form>
                </div>
                <p id="signuphref">Don't have an account? <a href="/signup" className="bold">Sign Up </a>here</p>
            </div>
            <div className="login-img-cont">
                
            </div>
        </div>
    )
}