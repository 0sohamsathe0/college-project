import React from 'react'
import Player1 from "../assets/Player1.png"
import Player2 from "../assets/Player2.png"
import Player3 from "../assets/Player3.png"


const StarPlayers = () => {
    return (
        <>
            <div className='w-full bg-gradient-to-tl from-[#28286a] to-[#12adfb] p-20 mt-14 rounded-t-3xl'>
                <h1 className='text-[3rem] text-white text-center font-bold mb-10 tracking-widest'>OUR FENCERS</h1>
                <div className=" text-white grid md:grid-cols-3 gap-10">
                    <div className='rounded-3xl bg-blue-900 flex justify-center items-center flex-col' >
                        <div className='playerImg overflow-hidden'>
                            <img src={Player1} alt="player" className="w-[20rem] h-full rounded-2x" />
                        </div>
                        <div className='playerInfo py-10 text-3xl'>
                            <h1>Ishwari Mendge</h1>
                        </div>
                    </div>
                    <div className='rounded-3xl bg-blue-900  flex justify-center items-center flex-col' >
                        <div className='playerImg overflow-hidden'>
                            <img src={Player2} alt="player" className="w-[20rem] h-full rounded-2x" />
                        </div>
                        <div className='playerInfo py-10 text-3xl'>
                            <h1>Om Angadi</h1>
                        </div>
                    </div>
                    <div className='rounded-3xl bg-blue-900  flex justify-center items-center flex-col' >
                        <div className='playerImg overflow-hidden'>
                            <img src={Player3} alt="player" className="w-[20rem] h-full rounded-2x" />
                        </div>
                        <div className='playerInfo py-10 text-3xl'>
                            <h1>Tanuja Shetty</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StarPlayers
