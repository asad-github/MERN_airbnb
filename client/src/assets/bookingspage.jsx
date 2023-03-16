import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { format } from "date-fns"

export default function BookingsPage() {
    const { action } = useParams()
    const [bookings, set_bookings] = useState([])
    const [images, set_images] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get('/users/bookings', {
            headers: {
                'Authorization': token
            }
        }).then(({ data }) => {
            set_bookings(data)
        })
    }, [])
    return (
        <div>
            {action !== 'new' &&
                bookings?.length > 0 && bookings.map(item => {
                    return (
                        <div className=" flex bg-gray-200 p-2 rounded-xl my-2" key={item}>
                            <div className=" w-96">
                                <img src={'http://localhost:3000/controllers/uploads/' + item.place.photos[0]} className=' object-cover rounded-xl' />
                            </div>
                            <div className=" p-3">
                                <h2 className=" font-bold text-lg">{item.place.hotel_name}</h2>
                                <a href={"https://maps.google.com/?q=" + item.place.address} target='_blank' className=" text-sm font-thin underline inline-flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    Address: {item.place.address},{item.place.city}
                                </a>
                                <br />
                                <div className=" py-2 gap-2">
                                    <span className=" font-medium pb-20">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-flex mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                        Stay : from {format(new Date(item.checkIn), 'dd-MM-yyyy')} to {format(new Date(item.checkOut), 'dd-MM-yyyy')}</span>
                                    <br />
                                    <div className=" py-2">
                                        <p className=" font-bold"> Booked by: {item.name}</p>
                                        <p className=" py-2 font-md"> No. of guests: {item.guests}</p>
                                        <p className=" font-bold text-2xl py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-flex mx-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Total Cost: {item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}