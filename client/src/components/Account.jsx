import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Logo from "../assets/Logo.png"
import "../App.css"
import { TiTick } from "react-icons/ti";
import { CiViewList } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { LuSwords } from "react-icons/lu";


const Account = () => {


    return (
        <>
            <div className=' w-full accountPage pt-24 px-10'>
                <div className='bg-white rounded-3xl flex justify-between items-start'>
                    <div className='p-5 w-[30%]'>
                        <img src={Logo} alt="profile-photo" className=' border border-black rounded-3xl' />
                        <div className='mt-5 gap-5 flex flex-col '>
                            <h1>Name : Dhruv Goradia</h1>
                            <h2>School/College Name : HNCC</h2>
                            <h3 className='flex text-lg items-center'>Verification :<span className='flex items-center'>  Verified <TiTick className='text-3xl text-green-800' /></span></h3>
                        </div>
                        <div className='flex flex-col gap-5 mt-5 font-bold'>
                            <NavLink to="" className="border border-[#0b0b51] rounded-xl p-3 text-[#0b0b51] flex w-full items-center justify-evenly">Personal Details < CiViewList className='text-3xl' /></NavLink>
                            <NavLink to="upcomingTournaments" className="border border-[#0b0b51] rounded-xl p-3 flex w-full items-center justify-evenly text-[#0b0b51]">Upcoming  <FaRegClock className='text-3xl' /></NavLink>
                            <NavLink to="certificates" className="border border-[#0b0b51] rounded-xl p-3 flex w-full items-center justify-evenly text-[#0b0b51]">Certificates <LiaCertificateSolid className='text-3xl' /></NavLink>
                            <NavLink to="matchesPlayed" className="border border-[#0b0b51] rounded-xl p-3 flex w-full items-center justify-evenly text-[#0b0b51]">Matches Played <LuSwords className='text-3xl' /></NavLink>
                        </div>
                    </div>

                    <div className='w-[70%] p-5'>
                        <Outlet />
                    </div>



                </div>
            </div>
        </>
    )
}

export default Account
