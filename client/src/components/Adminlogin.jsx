import React, { useState } from 'react';
import AdminBg from "../assets/AdminBg.png";
import Logo from "../assets/Logo.png";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const Adminlogin = () => {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let newErrors = {};

        if (!adminId) {
            newErrors.adminId = "Admin ID is required";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const logAdmin = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        if (adminId === "admin" && password === "admin@123") {
            Cookies.set('loginState','adminLoggedIn');
            alert("Login Successful");
            navigate("/adminProfile");
        } else {
            alert("Invalid Admin ID or Password");
        }
    };

    return (
        <>
            <div className='w-full h-[89vh] bg-blue-700 px-28 flex justify-center items-center'>
                <form method='POST' className='w-[80%] bg-white rounded-2xl gap-5 flex justify-between items-center' onSubmit={logAdmin}>
                    <div className="w-1/2 h-[100%]">
                        <img src={AdminBg} alt="Admin Login image" className='w-[100%] h-[100%] bg-cover bg-center' />
                    </div>
                    <div className="adminInfo w-1/2 flex flex-col items-center px-3">
                        <img src={Logo} alt="logo" className='w-[200px]' />
                        <div className='flex justify-between items-center w-full'>
                            <span className='w-[40%] border border-black'></span>
                            <h1 className='w-[60%] text-center font-extrabold text-3xl'>Admin Login</h1>
                            <span className='w-[40%] border border-black'></span>
                        </div>
                        <div className="my-5 w-full">
                            <div className='w-full my-5 px-5'>
                                <label htmlFor="adminId" className='font-bold text-xl'>Admin ID:</label>
                                <input 
                                    type="text" 
                                    name="adminId" 
                                    id="adminId" 
                                    className='w-full h-[3rem] font-bold px-3 border border-black text-black my-2' 
                                    placeholder='Your Admin ID' 
                                    value={adminId} 
                                    onChange={(e) => setAdminId(e.target.value)}
                                />
                                {errors.adminId && <p className="text-red-500">{errors.adminId}</p>}
                            </div>
                            <div className='w-full my-5 px-5'>
                                <label htmlFor="password" className='font-bold text-xl'>Password:</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className='w-full h-[3rem] font-bold px-3 border border-black text-black my-2' 
                                    placeholder='Your Password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p className="text-red-500">{errors.password}</p>}
                            </div>
                        </div>
                        <div>
                            <button type="submit" className='text-xl text-white font-bold px-5 py-3 rounded-lg bg-blue-500 mb-5'>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Adminlogin;
