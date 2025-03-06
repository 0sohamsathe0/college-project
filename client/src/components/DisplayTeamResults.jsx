import axios from "axios";
import React, { useState, useEffect } from "react";

const DisplayTeamResults = () => {
  const [tournaments, setTournaments] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [tournamentId, setTournamentId] = useState();

  const getTournaments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/admin/getAllTournaments"
      );
      let data = res.data;
      setTournaments(data);
    } catch (error) {}
  };

  const selectTournament = (e) => {
    let id = e.target.value;
    setTournamentId(Number(id));
    fetchIndivisualResult(id)
  };

  const fetchIndivisualResult = async(id)=>{
   
    const res = await axios.get(`http://localhost:3500/admin/getIndividualResult/${id}`) 
    console.log(res.data);
    

    setPlayerData(res.data)
  }

  useEffect(() => {
    getTournaments();
  }, []);

  return (
    <div>
      <h1 className="text-center text-[2rem] m-2 text-[#0e0e51] font-bold">Indivisual Results</h1>
      <div className="p-10 overflow-x-scroll">
        <select
          className="w-auto"
          value={tournamentId}
          onChange={(e) => selectTournament(e)}
        >
          <option value="">Select Tournament</option>
          {tournaments.length > 0 &&
            tournaments.map((tournament) => (
              <option value={tournament.tid} key={tournament.tid}>
                {tournament.title}
              </option>
            ))}
        </select>

        <table className=" w-full text-sm text-left rtl:text-right bg-yellow-600">
          <thead className="text-xs text-gray-900 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tournament Name
              </th>
              <th scope="col" className="px-6 py-3">
                Level
              </th>
              <th scope="col" className="px-6 py-3">
                Age Category
              </th>
            </tr>
          </thead>
          <tbody>
          {
            playerData.length > 0 ?
            playerData.map((data,index)=>(

            <tr className="bg-white" key={index+1}>
              <td scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap"><h1>{data.fullName}</h1></td>
              <td className="px-6 py-4">{data.eventName}</td>
              <td className="px-6 py-4">{data.position}</td>
            </tr>
            ))
            :
            <tr className="bg-white">
              <td colSpan={3} className="px-6 py-4 font-medium text-black whitespace-nowrap">No data to display</td>
            </tr>
          }
        </tbody> 
        </table>
      </div>
    </div>
  );
};

export default DisplayTeamResults;
