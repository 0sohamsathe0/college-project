import React from 'react'
import { NavLink, Routes, Route, Link } from 'react-router-dom'
import '../App.css'
import Home from "./Home.jsx"
import Adminlogin from "./Adminlogin.jsx"
import Logo from '../assets/Logo.png'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import PlayerRegistor from './PlayerRegistor.jsx'
import PlayerLogin from './PlayerLogin.jsx'
import PlayerProile from './PlayerProile.jsx'
import Tournaments from './Tournaments.jsx'




const Navbar = () => {
    return (
        <>

            <nav className='flex justify-between items-center gap-5 absolute w-full text-white'>


                <div className='logo w-1/5 flex items-center'>
                    <Link to="/">
                        <img src={Logo} alt="logo" width={100} />
                    </Link>
                </div>



                <div className='links_container hidden md:flex justify-between items-center w-3/5  bg-transparent text-[.7rem] lg:text-lg xl:text-xl font-bold'>
                    <NavLink to="/" className={({ isActive }) => `${isActive ? "border border-white rounded-md xl:rounded-3xl hover:no-underline px-3 py-2 xl:px-5 xl:py-3" : "text-white"} duration-200 ease-in-out`}>Home</NavLink>
                    <NavLink to="admin" className={({ isActive }) => `${isActive ? "border border-white rounded-md xl:rounded-3xl hover:no-underline px-3 py-2 xl:px-5 xl:py-3" : "text-white"} duration-200 ease-in-out`}>Admin Login</NavLink>
                    <NavLink to="playerLogin" className={({ isActive }) => `${isActive ? "border border-white rounded-md xl:rounded-3xl hover:no-underline px-3 py-2 xl:px-5 xl:py-3" : "text-white"} duration-200 ease-in-out`}>Player Login</NavLink>
                    <NavLink to="playerRegistor" className={({ isActive }) => `${isActive ? "border border-white rounded-md xl:rounded-3xl hover:no-underline px-3 py-2 xl:px-5 xl:py-3" : "text-white"} duration-200 ease-in-out`}>Player Registor</NavLink>
                    <NavLink to="tournaments" className={({ isActive }) => `${isActive ? "border border-white rounded-md xl:rounded-3xl hover:no-underline px-3 py-2 xl:px-5 xl:py-3" : "text-white"} duration-200 ease-in-out`}>Tournaments</NavLink>
                    <NavLink to="playerprofile" className={({ isActive }) => `${isActive ? "border border-white rounded-md xl:rounded-3xl hover:no-underline px-3 py-2 xl:px-5 xl:py-3" : "text-white"} duration-200 ease-in-out`}>Player Profile</NavLink>
                </div>


                <div className="hamburgerBtn w-[4rem] md:hidden flex flex-col gap-[5px] cursor-pointer mr-2 border border-white p-[10px] rounded-md">
                    <span className=' w-full h-[5px] bg-white rounded-full m-0 p-0'></span>
                    <span className=' w-full h-[5px] bg-white rounded-full m-0 p-0'></span>
                    <span className=' w-full h-[5px] bg-white rounded-full m-0 p-0'></span>
                </div>

                <div className='socialLinks w-1/5 hidden md:flex justify-evenly items-center text-2xl font-extrabold'>
                    <Link to="/">
                        <FaInstagram />
                    </Link >
                    <Link to="/">
                        <FaFacebookSquare />
                    </Link>
                    <Link to="/">
                        <CiYoutube />
                    </Link>
                </div>


            </nav>



            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="admin" element={<Adminlogin />} />
                <Route path='playerLogin' element={<PlayerLogin />} />
                <Route path='playerRegistor' element={<PlayerRegistor />} />
                <Route path='playerprofile' element={<PlayerProile />} />
                <Route path='tournaments' element={<Tournaments />} />
            </Routes>

        </>
    )
}

export default Navbar
