import React from 'react'

import ClubImg from '../assets/ClubImg.jpg'

const Club = () => {
    return (
        <div>
            <h1 className=' text-[2rem] md:text-[4rem] pt-10 text-center underline underline-offset-2  font-extrabold text-[#0e0e51] w-full lg:tracking-wide'>Join Our Fencing Club</h1>
            <div className='ClubSection w-full lg:px-10 px-3 py-3 rounded-2xl flex md:flex-row flex-col items-center justify-evenly gap-10 mt-10 text-sky-950'>

                <div className='lg:rounded-[50px] rounded-3xl w-full lg:w-1/2'>
                    <img src={ClubImg} alt="club image" className='w-full lg:rounded-[50px] rounded-3xl' />
                </div>



                <div className=' w-full lg:w-1/2' >
                    <p className='text-justify xl:text-2xl my-3 text-[#0e0e51]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ex quo quibusdam dolores ullam sint voluptate sit quos eius, deleniti vel, nulla reprehenderit, cupiditate culpa sequi. Totam ut pariatur dolorem! Nobis hic veritatis ducimus sit ea at molestias. Quae reiciendis veniam doloremque enim recusandae maiores nobis unde. Labore, quisquam molestias?</p>
                    <p className='text-justify my-3 xl:text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ex quo quibusdam dolores ullam sint voluptate sit quos eius?</p>

                    <button className='font-bold border border-[#0e0e51] text-[#0e0e51] text-2xl rounded-2xl px-7 py-3 hover:shadow-2xl duration-150'>Join Club</button>
                </div>


            </div>
        </div>
    )
}

export default Club
