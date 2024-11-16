
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function Layout(){

    return(
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

