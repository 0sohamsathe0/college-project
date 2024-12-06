import React, { useState } from 'react'
import HeroBg from "../assets/HeroBg.png"
import { FaExpand } from "react-icons/fa6";

const Certificates = () => {





    return (
        <>
            <div className='rounded-lg w-[20rem] p-2 border border-[#0b0b51]'>
                <img src={HeroBg} alt="certificate" className='rounded-lg' id='certificate' />
                <button className='border border-[#0b0b51] p-3 rounded-lg text-[#0b0b51] active:bg-[#0b0b51] active:text-white hover:shadow-xl font-bold flex justify-between items-center gap-3 mt-2'>Expand <FaExpand className=' active:bg-[#0b0b51] active:text-white text-xl text-[#0b0b51]' /></button>
            </div>
            <div className='absoulte bg-blue-gray-500 w-[100px]'>

            </div>
        </>
    )
}

export default Certificates
