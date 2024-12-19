import React, { useEffect, useState } from "react"
import axios from 'axios'

const MeritCertificate = () => {

    const [certificate, setCertificate] = useState("")
    const [playerName, setPlayerName] = useState("PlayerName")
    const [tournament,setTournament] = useState([])
    const [players,setPlayers] = useState([])
    
    const addMerit = (e) => {
        e.preventDefault();
        console.log(playerName, certificate);
        alert("added merit certificate")
        setPlayerName("")
        setCertificate("")
    }
    
    const fetchPlayers = async () => {
        try {
          let response = await axios.get(
            "http://localhost:3500/players/all-players"
          );
          
          setPlayers(response.data);
          
          response = await axios.get(
            "http://localhost:3500/admin/getAllTournaments"
          );
          setTournament(response.data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(()=>{fetchPlayers()},[])

      


    return (
        <>
            <div className='w-full bg-white rounded-md mt-3 flex flex-col justify-center'>
                <h1 className='w-full text-center font-bold py-4 text-xl'>Add Merit Certificate</h1>
                <div className="flex justify-center items-center gap-3 py-3">
                    <p className="font-bold text-md">Player Name :</p>
                    <select className="w-[30%]" onChange={(e) => setPlayerName(e.target.value)}>
                        {players.map((player)=>{
                            return (<option key={player.pid} value={player.pid}>{player.fullName}</option>)
                        })}
                        
                    </select>
                </div>
                <div className="flex justify-center items-center gap-3 py-3">
                <p className="font-bold text-md">Tournament Title :</p>
                <select className="w-[30%]">
                {tournament.map((player)=>{
                            return (<option key={player.tid} value={player.tid}>{player.title}</option>)
                        })}
                </select>
            </div>
                <div className="w-full flex flex-col justify-center items-center gap-3">
                    
                    <div>
                    <p className="font-bold text-md float-left">Add Certificate :</p>
                    <input type="file" onChange={(e) => setCertificate(e.target.value)} value={certificate}  className="inline-block"/>
                    </div>
                    
                <button onClick={addMerit} className="p-3 bg-blue-600 text-white font-bold rounded-md w-[30%] m-3">Add Merit Certificate</button>
                </div>
            </div>
        </>
    )
}

export default MeritCertificate
