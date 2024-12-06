import React from 'react'
import AdminBg from "../assets/AdminBg.png"
import Logo from "../assets/Logo.png"

const Adminlogin = () => {
    return (
        <>
            <div className='w-full h-full bg-gradient-to-tl from-blue-800 to-blue-700 pt-24 px-28'>
                <form method='POST' className='w-full bg-white rounded-2xl gap-5 h-[100%] flex justify-between items-center'>
                    <div className="w-1/2 h-[100%] ">
                        <img src={AdminBg} alt="Admin Login image" className='w-[100%] h-[100%] bg-cover bg-center' />
                    </div>
                    <div className="adminInfo w-1/2 flex flex-col items-center px-3">
                        <img src={Logo} alt="logo" className='w-[200px]' />
                        <div className='flex justify-between items-center w-full'>
                            <span className='w-[40%] border border-black'></span>        <h1 className='w-[60%] text-center font-extrabold text-3xl'>Admin Login</h1>   <span className='w-[40%] border border-black'></span>
                        </div>
                        <div className="my-5 w-full">
                            <div className='w-full my-5 px-5'>
                                <label htmlFor="adminId" className='font-bold text-xl'>Admin ID:</label>
                                <input type="text" name="adminId" id="adminId" className='w-full h-[3rem] font-bold px-3 border border-black text-black my-2' placeholder='Your Admin ID' />
                            </div>
                            <div className='w-full my-5 px-5'>
                                <label htmlFor="password" className='font-bold text-xl'>Password:</label>
                                <input type="password" name="password" id="password" className='w-full h-[3rem] font-bold px-3 border border-black text-black my-2' placeholder='Your Password' />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className='text-xl text-white font-bold px-5 py-3 rounded-lg bg-blue-500 mb-5'>Login</button>
                        </div>
                    </div>
                </form >
            </div >
        </>
    )
}

export default Adminlogin
