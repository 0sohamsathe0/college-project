import React from 'react'
import { NavLink, Routes, Route, Link } from 'react-router-dom'
import '../App.css'
import Home from "./Home.jsx"
import Adminlogin from "./Adminlogin.jsx"
import Logo from '../assets/Logo.png'
import PlayerRegistor from './PlayerRegistor.jsx'
import PlayerLogin from './PlayerLogin.jsx'
import PlayerProfile from './PlayerProfile.jsx'
import AdminProfile from './AdminProfile.jsx'
import Aboutus from './Aboutus.jsx'
import Contact from './Contact.jsx'

const Navbar = () => {
    return (
        <>

            <nav className='flex justify-between items-center pr-14 gap-5 w-full bg-blue-700 text-white'>

                    <Link to="/" className='logo w-1/5 flex items-center text-md font-bold'>
                        <img src={Logo} alt="logo" width={80} />All Star Fencing Club
                    </Link>
              
                <div className='w-auto links_container hidden md:flex justify-items-end items-center space-x-20 px-3  bg-transparent text-[.7rem] lg:text-lg xl:text-xl font-bold'>
                    {/* <NavLink to="/" className={({ isActive }) => `${isActive ? "border border-white rounded-md xl:rounded-3xl hover:no-underline px-3 py-2 xl:px-5 xl:py-3" : "text-white"} duration-200 ease-in-out`}>Home</NavLink> */}
                    {/* <NavLink to="/" className={({ isActive }) => `${isActive ? "border border-white rounded-md xl:rounded-3xl hover:no-underline px-3 py-2 xl:px-5 xl:py-3" : "text-white"} duration-200 ease-in-out`}>Admin Dashboard</NavLink> */}
                    <NavLink to="playerLogin" className="border border-white px-5 py-3 rounded-xl"> Login</NavLink>
                    <NavLink to="playerRegistor" className="border border-white px-5 py-3 rounded-xl"> Sign Up</NavLink>
                    {/* <NavLink to="adminProfile" className={({ isActive }) => `${isActive ? "border border-white rounded-md xl:rounded-3xl hover:no-underline px-3 py-2 xl:px-5 xl:py-3" : "text-white"} duration-200 ease-in-out`}>Admin Profile</NavLink>
                    <NavLink to="playerprofile" className={({ isActive }) => `${isActive ? "border border-white rounded-md xl:rounded-3xl hover:no-underline px-3 py-2 xl:px-5 xl:py-3" : "text-white"} duration-200 ease-in-out`}>Player Profile</NavLink> */}
                </div>

            </nav>



            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="about" element={<Aboutus />} />
                <Route path="contact" element={<Contact />} />
                <Route path="admin" element={<Adminlogin />} />
                <Route path='playerLogin' element={<PlayerLogin />} />
                <Route path='playerRegistor' element={<PlayerRegistor />} />
                <Route path='playerprofile' element={<PlayerProfile />} />
                <Route path='adminProfile/*' element={<AdminProfile />} />
            </Routes>

        </>
    )
}

export default Navbar
