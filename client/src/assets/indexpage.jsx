import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

export default function Index() {
    const [places, set_places] = useState([])
    useEffect(() => {
        axios.get('/places/').then(({ data }) => {
            set_places(data);
        });
    }, [])

    function savePlace() {
        // localStorage.setItem('places',)
        className += ' bg-black'
    }
    return (
        <div className=" flex justify-around flex-wrap">
            {places.map(item => {
                return (
                    <Link to={'/places/' + item._id}>
                        <div className=" w-96 bg-gray-100 m-2 rounded-lg h-[400px] my-2 border-4 border-r-rose-300 border-b-rose-300">
                            <button onClick={savePlace} className=' absolute rounded-full bg-white m-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                            </button>
                            <img src={'http://localhost:3000/controllers/uploads/' + item.photos[0]} className=' rounded-xl' />
                            <div className=" px-2">
                                <p className=" font-bold text-xl text-center py-3">{item.hotel_name}</p>
                                <p>Price staring at: <span className=" font-bold">{item.price}</span></p>
                                <p >At: {item.address},{item.city}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}