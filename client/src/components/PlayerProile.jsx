import React from 'react'
import Logo from "../assets/Logo.png"

const PlayerProile = () => {
    return (
        <div className=' bg-[#0b0b51] pt-24 w-full h-full flex justify-center flex-col items-center'>
            <div className='flex w-[60%] justify-center flex-col items-center bg-white rounded-xl'>

                <div className='w-[300px]'>
                    <img src={Logo} alt="photo" />
                </div>

                <h1 className='m-0 text-[2rem]'>Dhruv Hitesh Goradia</h1>

                <div className=' mt-3 text-xl w-full gap-12 flex justify-center items-center'>
                    <div className="flex flex-col gap-3">
                        <p>Gender: Male</p>
                        <p>Dob: 13-12-2004</p>
                        <p>Phone: 7741088375</p>
                        <p>Email: dhruv@gmail.com</p>
                        <p>Aadhar card number: 123456789102</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>School Name: HNCC</p>
                        <p>Pincode: 413002</p>
                        <p>Address 1: Nella nagar</p>
                        <p>Address 2: Budhwar Peth ,Solapur</p>
                        <p>Event Name: Saber</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerProile
