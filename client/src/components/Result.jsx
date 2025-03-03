import React from 'react'
import { Link,Route,Routes,Navigate, Outlet } from 'react-router-dom'
import ChampionResult from './ChampionResult'
import TeamResult from './TeamResult'
import IndivisualResult from './IndivisualResult'




const Result = () => {
    return (
        <div>
            <div className="mt-8 bg-white text-black shadow-[0_20px_20px_rgba(0,0,0,0.25)] rounded-lg overflow-hidden">

                <div className='flex justify-center items-center gap-4'>
                    <Link
                        to="championResult"
                        className="  bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600"
                    >
                       Champions Result
                    </Link>
                    <Link
                        to="teamResult"
                        className="  bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600"
                    >
                       Team Result
                    </Link>
                    <Link
                        to="indivisualResult"
                        className=" bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600"
                    >
                       Indivisual Result
                    </Link>
                </div>

                <main className="flex-1 p-6">
                    <Routes>
                        <Route path="/" element={<Navigate to="championResult" replace />} />
                        <Route path="championResult" element={<ChampionResult />} />
                        <Route path="teamResult" element={<TeamResult />} />
                        <Route path="indivisualResult" element={<IndivisualResult />} />
                    </Routes>


                    <Outlet />

                </main>
            </div>
        </div>
    )
}

export default Result
