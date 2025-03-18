import axios from "axios";
import React, { useState, useEffect } from "react";

const DisplayTeamResults = () => {
  const [tournaments, setTournaments] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [tournamentId, setTournamentId] = useState("");

  useEffect(() => {
    getTournaments();
  }, []);

  const getTournaments = async () => {
    try {
      const res = await axios.get("http://localhost:3500/admin/getAllTournaments");
      setTournaments(res.data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const selectTournament = (e) => {
    const id = e.target.value;
    setTournamentId(id);
    fetchIndividualResult(id);
  };

  const fetchIndividualResult = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3500/admin/getIndividualResult/${id}`);
      setPlayerData(res.data);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold text-blue-900 mb-6">🏆 Individual Results</h1>

      {/* Tournament Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium">Select Tournament</label>
        <select
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          value={tournamentId}
          onChange={selectTournament}
        >
          <option value="">-- Select Tournament --</option>
          {tournaments.map((tournament) => (
            <option key={tournament.tid} value={tournament.tid}>
              {tournament.title}
            </option>
          ))}
        </select>
      </div>

      {/* Player Cards */}
      <div className="grid grid-cols-2 gap-4">
        {playerData.length > 0 ? (
          playerData.map((data, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition"
            > 
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{data.fullName}</h3>
                <p className="text-gray-500">🏅 {data.position}</p>
                <p className="text-gray-500">📌 {data.eventName}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No results available.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayTeamResults;
