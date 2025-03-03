import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const IndivisualResult = () => {
  const [Alltournaments, setAllTournaments] = useState([]);
  const [singleTournament, setSingleTournament] = useState("");
  const [position, setPosition] = useState("first");
  const [players,setPlayers] = useState([]);
  const [singlePlayer,setSinglePlayer] = useState("");

  const selectPosition = (e) => {
    setPosition(e.target.value);
    console.log(e.target.value);
  };

  const fetchTournaments = async () => {
    const resp = await axios.get(
      "http://localhost:3500/admin/getAllTournaments"
    );
    setAllTournaments(resp.data);
    
  };

  const fetchPlayers = async (tourId) => {
    try {

      const res = await axios.get(`http://localhost:3500/players/all-players/${Number(tourId)}`);
      console.log(res.data);
      setPlayers(res.data); 
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };
  
  console.log(players);
  

  const selectSingletournament = (e) => {
    const tourId = e.target.value;
    setSingleTournament(tourId);
    console.log(e.target.value);
    fetchPlayers(tourId);
  };

  const selectPlayer = (e)=>{
    setSinglePlayer(e.target.value);
    console.log(e.target.value);
    
  }

  useEffect(() => {
    fetchTournaments();
  }, []);

  const addIndivisualResult = async() => {
    const result = await axios.get(`http://localhost:3500/admin/getTentry/${singleTournament}/${singlePlayer}`)
    console.log(result.data.tentryid[0].tentryid)


    let data = {
        tentryid:Number(result.data.tentryid[0].tentryid),
        position:position,
    }
    console.log(data);
    
    const res = await axios.post("http://localhost:3500/admin/add-result/individual", data,{
        headers:{
            "Content-Type": "application/json",
        },
    });
    console.log(res.data);
  };

  return (
    <div>
      <table className="relative overflow-x-auto w-full text-sm text-left rtl:text-right bg-yellow-600">
        <thead className="text-xs text-gray-900 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tournament Name
            </th>
           <th scope="col" className="px-6 py-3">
              Players
            </th> 
            <th scope="col" className="px-6 py-3">
              Position
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td
              scope="row"
              className="px-6 py-4 font-medium text-black whitespace-nowrap"
            >
              <select
                value={singleTournament}
                onChange={selectSingletournament}
              >
                <option value="Select Tournament">Select Tournament</option>
                {Alltournaments.map((tournament) => (
                  <option value={tournament.tid} key={tournament.tid}>
                    {tournament.title}
                  </option>
                ))}
              </select>
            </td>
             <td className="px-6 py-4">
                            <select value={singlePlayer} onChange={selectPlayer}>
                                {
                                  players.length>0 ?
                                   players.map((player)=>(
                                    <option value={player.pid} key={player.pid}>{player.fullName}</option>
                                  ))
                                  :
                                  <>
                                  No Players in this tournament
                                  </>
                                }
                            </select>
                        </td> 
            <td className="px-6 py-4">
              <select onChange={selectPosition} value={position}>
                <option value="first">1st</option>
                <option value="second">2nd</option>
                <option value="third">3rd</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        className="bg-blue-600 text-white rounded-lg p-3 active:bg-blue-700"
        onClick={addIndivisualResult}
      >
        Add Indivisual Result
      </button>
    </div>
  );
};

export default IndivisualResult;
