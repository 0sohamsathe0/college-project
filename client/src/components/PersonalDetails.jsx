import React, { useState } from 'react'
import InputBox from './InputBox'
import { BsPencilSquare } from "react-icons/bs";
import { FaSave } from "react-icons/fa";

const PersonalDetails = () => {

    const [readOnly, setReadOnly] = useState(true);

    return (
        <>
            <h1 className='font-bold text-3xl mt-10 text-[#0b0b51] text-center'>Personal Details</h1>
            <div className='w-full  p-5 mt-5 flex justify-evenly items-center gap-5 border border-black rounded-3xl'>
                <div className='w-[50%] flex flex-col items-start gap-10 m-0 p-5'>
                    <InputBox inputType="text" inputId="fullName" inputName="fullName" inputValue="Dhruv Goradia" readOnly={readOnly} />
                    <InputBox inputType="text" inputId="gender" inputName="gender" inputValue="Male" readOnly={readOnly} />
                    <InputBox inputType="text" inputId="eventName" inputName="eventName" inputValue="Saber" readOnly={readOnly} />
                </div>
                <div className='w-[50%] flex flex-col items-start gap-10 m-0 p-5'>
                    <InputBox inputType="email" inputId="email" inputName="email" inputValue="Dhruv13@gmail.com" readOnly={readOnly} />
                    <InputBox inputType="number" inputId="phone" inputName="phone" inputValue="7741088375" readOnly={readOnly} />
                    <InputBox inputType="text" inputId="addressLine1" inputName="addressLine1" inputValue="Solapur" readOnly={readOnly} />
                </div>
            </div>
            <button type="button" className='font-bold text-[#0b0b51] hover:shadow-2xl active:bg-[#0b0b51] active:text-white duration-150 border border-[#0b0b51] rounded-lg text-lg py-3 px-5 mt-3 flex items-center gap-3 '>Edit <BsPencilSquare className='text-lg' /> Save <FaSave /></button >
        </>
    )
}

export default PersonalDetails
