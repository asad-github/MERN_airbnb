import React, { useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"

export default function Signup(){
    const [form,setform]=React.useState({
        username:'',
        email:'',
        password:'',
        checkbox:true
    })
    const [redirect,setredirect]=useState(false)
    function handleChange(event){
        const {name,value,type,checked}=event.target
        setform(prevdata=>{
            return{
                ...prevdata,
                [name]:type==='checkbox'?checked:value
            }
        })
    }
    async function handleSubmit(event){
        event.preventDefault()
        const tc=form.checkbox?'':'Please agree to terms and conditions'
        const {username,email,password}=form
        try {
            await axios.post('/users/signup',{
                username,email,password
            })
            alert('Signup successfull, now you can login')
            setredirect(true)
        } catch (error) {
            alert('Signup failed, Try agian')
        }
    }
    if((redirect)){
        return <Navigate to={'/login'}/>
    }
    return(
        <div id="login-page">
            <div className="form-cont">
                <h1>Signup to airbnb</h1>
                <div>
                    <form className="form  mb-0" onSubmit={handleSubmit}>
                        <input type='text' placeholder="John Doe" className="input" value={form.username} onChange={handleChange} name='username'></input>
                        <input type='text' placeholder="youremail@_.com" className="input" value={form.email} onChange={handleChange} name='email'></input>
                        <input type='password' placeholder="password" className="input" value={form.password} onChange={handleChange} name='password'></input>
                        <div className="checkbox">
                            <input type="checkbox" name="checkbox" onChange={handleChange} checked={form.checkbox}></input><span>  Agree to terms and conditions</span>
                            
                        </div>
                        <button className="btn">Signup</button>
                    </form>
                </div>
                <p id="signuphref">Already a memeber <a href="/login" className="bold">Login </a>here</p>
            </div>
            <div className="login-img-cont">
                
            </div>
        </div>
    )
}