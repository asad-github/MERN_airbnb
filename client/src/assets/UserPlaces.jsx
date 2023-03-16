import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import AccountNav from "./accountnav"
import SinglePlace from "./SinglePlace"

export default function UserPlaces() {
    const [places, setplaces] = useState([])
    const token = localStorage.getItem('token')
    const { action } = useParams()
    useEffect(() => {
        axios.get('/places/userplaces', {
            headers: {
                'Authorization': token
            }
        }).then(({ data }) => {
            setplaces(data);
        });
    }, [])
    return (
        <div>
            <div>
                {action !== undefined && <SinglePlace />}
                {action === undefined &&
                    <div className="mt-4">
                        <h2 className=" text-3xl mt-4 mb-4">My places</h2>
                        {places.length > 0 && places.map(place => (
                            <Link to={'/account/places/' + place._id} className=" flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-2">
                                <div className=" flex w-52 h-auto bg-gray-300 rounded-xl shrink-0 ">
                                    <img src={'http://localhost:3000/controllers/uploads/' + place.photos[0]} className=' object-cover rounded-xl' />
                                </div>
                                <div className="grow-0 shrink mx-auto">
                                    <h2 className="text-2xl font-semibold">{place.hotel_name}</h2>
                                    <p className="text-sm mt-2 text">{place.description}</p>
                                    <p className="text-sm mt-2 font-medium">{place.address}, {place.city}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}