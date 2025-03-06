import React from 'react'
import '../App.css'
import Club from "./Club.jsx"
import FencerDesign from "../assets/FencerDesign.png"
import DisplayChampionsResults from './DisplayChampionsResults.jsx'
import DisplayLatestTournaments from './DisplayLatestTournaments.jsx'
import DisplayTeamResults from './DisplayTeamResults.jsx'

const Home = () => {
    return (
        <>
            <div className='heroSection mb-10 flex justify-center items-center'>
            </div>
            <Club />
            <h2 className='text-md sm:text-lg md:text-xl lg:text-2xl text-[#0e0e51] mx-3 sm:mx-6 md:mx-8 lg:mx-10 mt-10 sm:mt-14 md:mt-16 lg:mt-20 underline underline-offset-4 font-extrabold'>WHO WE ARE</h2>
            <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#0e0e51] mx-3 sm:mx-6 md:mx-8 lg:mx-10 mt-2 underline underline-offset-4 font-extrabold'>A Legacy of Excellence</h1>
            <div className='w-full aboutSection px-3 sm:px-6 md:px-8 lg:px-12 font-bold rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10'>
                <div className='w-full lg:w-1/2 aboutInfo text-[#0e0e51]'>
                    <p className="text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum ad voluptas, est saepe optio in minima voluptatum fuga fugiat nisi quisquam aut ea laborum soluta sed id accusamus, dicta quam distinctio quos a hic quaerat officia.</p>
                    <div className='grid grid-cols-2 gap-4 sm:gap-5 mt-6 sm:mt-10 font-bold'>
                        <div className='flex flex-col justify-center items-center px-5 sm:px-7 py-2 sm:py-3 rounded-2xl bg-blue-gray-100 gap-2 sm:gap-3'>
                            <h1 className='text-xl sm:text-2xl'>100+</h1>
                            <p className='text-sm sm:text-base'>Players in Academy</p>
                        </div>
                        <div className='flex flex-col justify-center items-center px-5 sm:px-7 py-2 sm:py-3 rounded-2xl bg-blue-gray-100 gap-2 sm:gap-3'>
                            <h1 className='text-xl sm:text-2xl'>10+</h1>
                            <p className='text-sm sm:text-base'>International Players</p>
                        </div>
                        <div className='flex flex-col justify-center items-center px-5 sm:px-7 py-2 sm:py-3 rounded-2xl bg-blue-gray-100 gap-2 sm:gap-3'>
                            <h1 className='text-xl sm:text-2xl'>30+</h1>
                            <p className='text-sm sm:text-base'>National Players</p>
                        </div>
                        <div className='flex flex-col justify-center items-center px-5 sm:px-7 py-2 sm:py-3 rounded-2xl bg-blue-gray-100 gap-2 sm:gap-3'>
                            <h1 className='text-xl sm:text-2xl'>50+</h1>
                            <p className='text-sm sm:text-base'>State Players</p>
                        </div>
                    </div>
                </div>

                <div className='hidden lg:flex lg:w-1/2 aboutImg justify-center items-center bg-yellow-500 rounded-[30px] sm:rounded-[40px] md:rounded-[50px]'>
                    <img src={FencerDesign} alt="about image" className='w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg' />
                </div>
            </div>
            <DisplayLatestTournaments />
            <DisplayChampionsResults /> 
            <DisplayTeamResults /> 
        </>
    )
}

export default Home
