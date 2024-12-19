import React, { useState } from 'react'

const ParticipationCertificate = () => {

    const [certificate, setCertificate] = useState("")
    const [playerName, setPlayerName] = useState("PlayerName")

    const addMerit = (e) => {
        e.preventDefault();
        console.log(playerName, certificate);
        alert("added merit certificate")
        setPlayerName("")
        setCertificate("")

    }


    return (
        <div className='w-full bg-white rounded-md mt-3 flex flex-col justify-center'>
            <h1 className='w-full text-center font-bold py-4 text-xl'>Add Participation Certificate</h1>
            <div className="flex justify-center items-center gap-3 py-3">
                <p className="font-bold text-md">Player Name :</p>
                <select className="w-[30%]" onChange={(e) => setPlayerName(e.target.value)}>
                    <option value="Siddhant">Siddhant</option>
                    <option value="Sidral">Sidral</option>
                    <option value="Ishwar">Ishwar</option>
                    <option value="Black Nigga">Black Nigga</option>
                </select>
            </div>
            <div className="flex justify-center items-center gap-3">
                <p className="font-bold text-md">Add Certificate :</p>
                <input type="file" onChange={(e) => setCertificate(e.target.value)} value={certificate} className="w-[30%]" />
            </div>
            <button onClick={addMerit} className="p-3 bg-blue-600 text-white font-bold rounded-md w-[30%] m-3">Add Participation Certificate</button>
        </div>
    )
}

export default ParticipationCertificate
