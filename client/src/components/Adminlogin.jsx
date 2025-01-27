import React, { useState } from 'react'
import AdminBg from "../assets/AdminBg.png"
import Logo from "../assets/Logo.png"
import { useNavigate } from 'react-router-dom'

const Adminlogin = () => {
    
    const [adminId,setAdminId] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()


    const logAdmin = () => {

        if(adminId === "admin" && password === "admin@123" ){
            document.cookie = 
            alert("Login Successful")
            navigate("/adminProfile")
        }
        else{
            alert("Please fill all the fields")
        }
        
    }
    const changePass = (e) => {
        setPassword(e.target.value)
    }
    const changeId = (e) => {
        setAdminId(e.target.value)
    }


    return (
        <>
            <div className='w-full h-[86.3vh] bg-blue-700 px-28 flex justify-center items-center'>
                <form method='POST' className='w-[80%] bg-white rounded-2xl gap-5  flex justify-between items-center'>
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
                                <input type="text" name="adminId" id="adminId" className='w-full h-[3rem] font-bold px-3 border border-black text-black my-2' required placeholder='Your Admin ID' value={adminId} onChange={changeId}/>
                            </div>
                            <div className='w-full my-5 px-5'>
                                <label htmlFor="password" className='font-bold text-xl'>Password:</label>
                                <input type="password" name="password" id="password" className='w-full h-[3rem] font-bold px-3 border border-black text-black my-2' required placeholder='Your Password' value={password} onChange={changePass}/>
                            </div>
                        </div>
                        <div>
                            <button type="submit" onClick={logAdmin} className='text-xl text-white font-bold px-5 py-3 rounded-lg bg-blue-500 mb-5'>Login</button>
                        </div>
                    </div>
                </form >
            </div >
        </>
    )
}

export default Adminlogin
