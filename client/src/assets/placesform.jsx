import axios from "axios"
import React, { useState } from "react"

export default function PlacesForm() {
    const [form, setform] = useState({
        hotel_name: '',
        address: '',
        city: '',
        description: '',
        extraInfo: '',
        price: 0,
        maxGuests: 0,
        check_in: '',
        check_out: ''
    })
    const [perks, setperks] = useState({
        wifi: false,
        parking: false,
        room_keeping: false,
        location: false,
        pets:false,
        tv:false
    })
    function handleChange(event) {
        const { name, value, checked, type } = event.target
        setform(prevData => {
            return {
                ...prevData,
                [name]: type === 'checkbox' ? checked : value
            }
        })
    }
    function handlecbClick(ev) {
        const { checked, name } = ev.target;
        setperks(prevperks => {
            return {
                ...prevperks,
                [name]: checked
            }
        })
    }
    const token=localStorage.getItem('token')
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            await axios.post('/places/new',{
                form,perks,add_photos
            },{
                headers:{
                    'Authorization':token
                },
            })
            alert('Place added Successfully')
            return <Navigate to={'/'}/>
        } catch (error) {
            alert('something went wrong',error)
        }
    }
    const [add_photos,set_add_photos]=useState([])
    const [photo_link,set_photo_link]=useState('')
    const img_url=document.getElementById('img-url')
    async function Add_photo_by_link(event){
        img_url.value=''
        try {
            const {data:filename}=await axios.post('/places/upload-link',{link:photo_link})
            set_add_photos(prev=>{
                return [...prev,filename]
            })
            set_photo_link('')
            
        } catch (error) {
            console.log(error)   
        }
    }
    async function upload_photo(event){
        const files=event.target.files
        const data=new FormData()
        for (let index = 0; index < files.length; index++) {
            data.append('photos',files[index])            
        }
        const {data:filenames}=await axios.post('/places/upload-photo', data, {
            headers: {'Content-type':'multipart/form-data'}
        })
        if(filenames.length>1){
            set_add_photos(prev=>{
                return [...prev,...filenames]    
            })
        }
        else{
            set_add_photos(prev=>{
                return [...prev,filenames]
            })
        }
    }
    return (
        <div className="  text-lg mx-auto">
            <h1 className=" my-2">Enter Hotel Details</h1>
            <form className=" w-96 mx-auto text-lg" onSubmit={handleSubmit}>
                <h2 className=" my-2">Hotel Name</h2>
                <input type='text' className="border-2 border-black rounded-md w-full py-1 px-2" onChange={handleChange} name='hotel_name' value={form.hotel_name}></input>
                <h2 className=" my-2">Address</h2>
                <div>
                    <input type='text' className="border-2 border-black rounded-md w-84 py-1 px-2 mr-2" name="address" value={form.address} onChange={handleChange}></input>
                    <input type='text' className="border-2 border-black rounded-md w-32 py-1 px-2" placeholder="city" name="city" value={form.city} onChange={handleChange}></input>
                </div>
                <h2 className=" my-2">Description</h2>
                <textarea className="border-2 border-black rounded-md w-full py-1 px-2" name="description" value={form.description} onChange={handleChange}></textarea>
                <h2 className=" my-2">Extra Info</h2>
                <textarea className="border-2 border-black rounded-md w-full py-1 px-2" name="extraInfo" value={form.extraInfo} onChange={handleChange}></textarea>
                <h2 className=" my-2">Price - Ruppes(per night)</h2>
                <input type='number' className="border-2 border-black rounded-md w-full py-1 px-2" name="price" value={form.price} onChange={handleChange}></input>
                <div className=" flex-col mt-3">
                    <div>
                        <label className=" my-2 mr-2">Check In Time (AM)</label>
                        <input type='time' className="border-2 border-black rounded-md py-1 px-2 ml-3 mb-2 " name="check_in" value={form.check_in} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label className=" my-2">Check Out Time (PM) </label>
                        <input type='time' className="border-2 border-black rounded-md py-1 px-2 mb-2" name="check_out" value={form.check_out} onChange={handleChange}></input>
                    </div>
                    <label className=" my-2 mr-4">Max guests</label>
                    <input type='number' className="border-2 border-black rounded-md py-1 px-2 " name="maxGuests" value={form.maxGuests} onChange={handleChange}></input>
                </div>
                <div>
                    <h2 className=" my-2">Perks</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <label className=" gap-2 text-sm flex my-auto">
                            <input type={'checkbox'} checked={perks.wifi} name='wifi' onChange={handlecbClick}></input>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                            </svg>
                            Free WiFi
                        </label>
                        <label className=" flex my-auto gap-2 text-sm">
                            <input type={'checkbox'} checked={perks.parking} name='parking' onChange={handlecbClick}></input>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            Free Parking
                        </label>
                        <label className="  flex my-auto gap-2 text-sm">
                            <input type={'checkbox'} checked={perks.location} name='location' onChange={handlecbClick}></input>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            Premium Location
                        </label>
                        <label className="  flex my-auto gap-2 text-sm">
                            <input type={'checkbox'} checked={perks.room_keeping} name='room_keeping' onChange={handlecbClick}></input>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                            Room keeping
                        </label>
                        <label className="  flex my-auto gap-2 text-sm">
                            <input type={'checkbox'} checked={perks.tv} name='tv' onChange={handlecbClick}></input>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            TV
                        </label>
                        <label className="  flex my-auto gap-2 text-sm">
                            <input type={'checkbox'} checked={perks.pets} name='pets' onChange={handlecbClick}></input>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                            Pets
                        </label>
                    </div>
                </div>
                <h2 className=" mt-4 text-xl">Photos of the place</h2> <p className=" mb-2 text-sm">(upload at least six images)</p>
                <div>
                    <div className=" flex">
                        <input type='text' placeholder="url of photos" id='img-url' className="border-2 border-black rounded-md w-80 px-2" 
                        onChange={e => set_photo_link(e.target.value)}></input>
                        <button type='button' className=" bg-gray-400 rounded-2xl ml-2 hover:bg-gray-300" onClick={Add_photo_by_link}>Add Photo</button>
                    </div>
                    <div className=" grid grid-cols-3 gap-2">    
                        {add_photos.map(item=>{
                            return <img key={item} 
                             alt="" className=" mt-1 w-32 rounded-2xl" src={'http://localhost:3000/controllers/uploads/'+item}/>
                        })}
                    </div>
                    <label className=" bg-gray-400 rounded-xl ml-2 px-2 py-1 flex items-center my-2 hover:bg-gray-300 cursor-pointer">
                        <input type='file' multiple className=" hidden" onChange={upload_photo}></input>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                        </svg>
                        Upload from device
                    </label>
                </div>
                <button className=" text-xl bg-rose-600 my-2 mx-auto px-2 py-2 rounded-lg w-full hover:bg-rose-500">Submit</button>
            </form>
        </div>
    )
}
