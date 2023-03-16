import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { differenceInCalendarDays } from 'date-fns'

export default function SinglePlace() {
    const { action } = useParams()
    const [place, set_single_place] = useState()
    const [book, set_book] = useState({
        checkin: '',
        checkout: '',
        guests: 1,
        name: '',
        phone: '',
    })
    const [redirect,setRedirect] = useState('');
    useEffect(() => {
        if (!action) {
            return;
        }
        axios.get(`/places/userplaces/${action}`).then(response => {
            set_single_place(response.data);
        });
    }, []);
    if (!place) return '';
    let no_of_days = 0
    function handleChange(ev) {
        const { name, value } = ev.target
        set_book(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const token = localStorage.getItem('token')
    async function handleSubmit(event) {
        event.preventDefault()
        const {data}=await axios.post('/users/bookings', {
                price: no_of_days * place.price,
                place: place._id,...book
            },{
            headers: {
                'Authorization': token
            },
        })
        setRedirect(`/account/bookings/${data._id}`)
    }
    if (book.checkin && book.checkout) {
        no_of_days = differenceInCalendarDays(new Date(book.checkout), new Date(book.checkin))
    }
    const photos = place.photos
    const perks = place.perks
    const perks_arr = Object.entries(perks.find(item => item))
    if(redirect){
        return <Navigate to={redirect}/>
    }
    return (
        <div className=" bg-gray-100 mt-2 -mx-3 px-8">
            <h1 className=" mt-4 py-3 font-bold">{place.hotel_name}</h1>
            <a href={"https://maps.google.com/?q=" + place.address} target='_blank' className=" font-semibold text-md underline inline-flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Address: {place.address},{place.city}
            </a>
            <div className="flex overflow-x-scroll my-2 -px-2">
                {photos.map(item => {
                    return (
                        <img src={'http://localhost:3000/controllers/uploads/' + item} className=' object-cover rounded-xl mx-2 w-[700px]' />
                    )
                })}
            </div>
            <div>
                <p className=" font-bold text-lg">Description</p>
                <p>{place.description}</p>
            </div>
            <div className=" grid grid-cols-2 mt-2">
                <div className=" bg-gray-200 px-2 rounded-xl">
                    <p className=" font-semibold text-lg py-2">Extra Details</p>
                    <p>{place.extraInfo}</p>
                    <p className=" font-bold text-md pt-2">Check In after: {place.check_in}</p>
                    <p className=" font-bold text-md">Check Out before: {place.check_out}</p>
                    <p className=" font-semibold text-md">Max Guests: {place.maxGuests}</p>
                </div>
                <div className=" bg-gray-200 w-[300px] rounded-2xl px-2 py-2 shadow shadow-gray-500 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <p className=" px-4 font-bold text-center"> Price: {place.price} per Night</p>
                        <div className=" border border-gray-400 rounded-2xl my-2">
                            <label className=" px-2.5">Check In</label>
                            <input type="date" className="rounded-lg my-2 px-1 py-1" name="checkin" value={book.checkin} onChange={handleChange} />
                            <label className=" px-2">Check Out</label>
                            <input type="date" className=" my-2 py-1 rounded-lg px-1" name="checkout" value={book.checkout} onChange={handleChange} /><br />
                            <label className=" px-2">No. of Guests</label>
                            <input type='number' className=" w-36 my-2 px-1 py-1 rounded-lg" name="guests" value={book.guests} onChange={handleChange}></input>

                            {no_of_days > 0 && (
                                <div>
                                    <label className=" px-2">Your full Name</label>
                                    <input type='text' className=" w-36 my-2 px-1 py-1 rounded-lg" name="name" value={book.name} onChange={handleChange}></input>
                                    <label className=" px-2">Your Phone No.</label>
                                    <input type='text' className=" w-36 my-2 px-1 rounded-lg py-1" name="phone" value={book.phone} onChange={handleChange}></input>
                                    <span className=" px-2 my-2 font-bold">Total Price: {place.price * no_of_days}</span>
                                </div>
                            )}
                        </div>
                        <div className=" flex justify-center align-bottom">
                            <button className=" bg-rose-400 inline-flex rounded-lg text-lg px-3 py-1 hover:bg-rose-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                                Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
