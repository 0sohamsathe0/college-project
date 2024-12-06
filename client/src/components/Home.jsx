import React from 'react'
import '../App.css'
import Club from "./Club.jsx"

import Aboutus from './Aboutus'
import StarPlayers from './StarPlayers.jsx'


const Home = () => {
    return (
        <>


            <div className='heroSection mb-10 flex justify-center items-center'>
            </div>
            <Club />
            <Aboutus />
            <StarPlayers />
        </>
    )
}

export default Home
