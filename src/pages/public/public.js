import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, Topheader, Footer } from '../../components'
import { useSelector } from "react-redux";


const Public = () => {
    return (
        <div>
            <div className="w-full">   <Topheader /></div>

            <div className="w-full flex flex-col items-center">
                <Header />

                <Navigation />
                <div className="w-full flex items-center flex-col">
                    <Outlet />
                </div>

            </div>
            <div className="w-full">     <Footer />  </div>


        </div>

    )
}

export default Public