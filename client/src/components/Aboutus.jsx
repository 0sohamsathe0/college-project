import React from 'react'
import FencerDesign from "../assets/FencerDesign.png"

const Aboutus = () => {
    return (
        <>
            <h2 className=' text-md  lg:text-[2rem] text-[#0e0e51] mx-3 lg:mx-10 mt-20 underline underline-offset-4 font-extrabold'>WHO WE ARE</h2>
            <h1 className=' text-md  lg:text-[3rem] text-[#0e0e51] mx-3 lg:mx-10 mt-2 underline underline-offset-4 font-extrabold'>A Legacy of Excellence</h1>
            <div className='w-full aboutSection lg:px-12 px-3 font-bold rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-10'>
                <div className='w-full lg:w-1/2 aboutInfo text-[#0e0e51]'>
                    <p className="text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum ad voluptas, est saepe optio in minima voluptatum fuga fugiat nisi quisquam aut ea laborum soluta sed id accusamus, dicta quam distinctio quos a hic quaerat officia. Amet velit repellat, tempore quibusdam omnis laudantium, quod officiis eum error dicta enim pariatur inventore iste voluptas voluptatum corporis,</p>
                    <div className='grid grid-cols-2 gap-5 mt-10 font-bold'>
                        <div className='flex flex-col justify-center items-center px-7 py-3 rounded-2xl bg-blue-gray-100 gap-3'>
                            <h1 className='text-2xl'>100+</h1>
                            <p>Players in Academy</p>
                        </div>
                        <div className='flex flex-col justify-center items-center px-7 py-3 rounded-2xl  bg-blue-gray-100 gap-3'>
                            <h1 className='text-2xl'>10+</h1>
                            <p>International Players</p>
                        </div>
                        <div className='flex flex-col justify-center items-center px-7 py-3 rounded-2xl bg-blue-gray-100 gap-3'>
                            <h1 className='text-2xl'>30+</h1>
                            <p>National Players</p>
                        </div>
                        <div className='flex flex-col justify-center items-center px-7 py-3 rounded-2xl bg-blue-gray-100 gap-3'>
                            <h1 className='text-2xl'>50+</h1>
                            <p>State Players</p>
                        </div>
                    </div>
                </div>

                <div className='hidden lg:w-1/2 aboutImg lg:flex justify-center items-center bg-yellow-500 rounded-[50px]'>
                    <img src={FencerDesign} alt="about image" />
                </div>
            </div>
        </>
    )
}

export default Aboutus
