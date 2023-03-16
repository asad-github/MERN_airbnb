import { useContext } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
import axios from "axios"
import PlacesPage from "./myplacespage"
import AccountNav from "./accountnav"
import BookingsPage from "./bookingspage"

export default function AccountPage() {
    const {user, setuser } = useContext(UserContext)
    if (!user) {
        return <Navigate to={'/login'} />
    }
    let { subpage } = useParams()
    async function logout() {
        await axios.post('/users/logout')
        localStorage.setItem('token','')
        setuser(null)
        return <Navigate to={'/'} />
    }
    return (
        <div>
            <AccountNav />
            <div>
                {subpage == 'profile' &&
                    <div className=" flex-row justify-center ">
                        <p className=" text-center">Account Details:</p>
                        <br></br>
                        <p className=" text-center font-bold">Username: {user.username}</p>
                        <br></br>
                        <p className=" text-center font-bold">Email: {user.email}</p>
                        <button type='button' className=" w-full my-4 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-300" onClick={logout}>Logout</button>
                    </div>}
            </div>
            {subpage == 'places' && (
                <>
                    <PlacesPage />
                </>
            )}
            {subpage =='bookings' &&(
                <>
                    <BookingsPage/>
                </>
            )}
        </div>
    )
}