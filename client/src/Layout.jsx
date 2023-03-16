import { Outlet } from "react-router-dom";
import Navbar from "./assets/navbar";

export default function Layout(){
    return(
        <div className=" p-4">
            <Navbar/>
            <Outlet/>
        </div>
    )
}