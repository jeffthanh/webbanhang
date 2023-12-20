import React from "react";
import { Banner, Sidebar, BestSellers, Dealdaily, Featureproduct } from '../../components'

const Home = () => {
    return (
        <>
            <div className="w-main flex mt-6">

                <div className="flex flex-col gap-5 w-[25%] flex-auto ">
                    <Sidebar />
                    <Dealdaily />
                </div>

                <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
                    <Banner />
                    <BestSellers />
                </div>

            </div>
            <div className="my-8">
                <Featureproduct />
            </div>
            
          
        </>
    )
}

export default Home