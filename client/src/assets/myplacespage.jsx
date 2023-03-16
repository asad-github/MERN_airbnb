import { Link, useParams } from "react-router-dom";
import PlacesForm from "./placesform";
import SinglePlace from "./SinglePlace";
import UserPlaces from "./UserPlaces";

export default function PlacesPage() {
    const { action} = useParams()
    const {id}=useParams()
    console.log(action,id)
    return (
        <div>
            {action !== 'new' &&
                <div className=" text-center">
                    <Link to={'/account/places/new'} className='bg-rose-600 text-white px-2 py-2 rounded-full inline-flex gap-1 shadow hover:shadow-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Place
                    </Link>
                    <UserPlaces/>
                </div>
            }
            {id!==undefined && (
                <SinglePlace/>
            )}
            {action ==='new' && (
                <PlacesForm/>
            )}
        </div>
    )
}