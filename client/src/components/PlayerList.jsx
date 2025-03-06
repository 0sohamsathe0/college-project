import React, { useEffect, useState } from 'react';
import axios from 'axios';


const PlayerList = () => {

  const [playerList, setPlayerList] = useState([]);

  const fetchPlayers = async () => {
    try {
      let response = await axios.get("http://localhost:3500/players/all-players");
      setPlayerList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Players List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left rounded-lg">
          <thead className="bg-yellow-500">
            <tr >
              <th className=" px-4 py-2">Sr. No</th>
              <th className=" px-4 py-2">Name</th>
              <th className=" px-4 py-2">AadharCard No</th>
              <th className=" px-4 py-2">DOB</th>
              <th className=" px-4 py-2">Event</th>
            </tr>
          </thead>
          <tbody>
            {playerList.length > 0 ? (
              playerList.map((player, index) => (
                <tr key={player.pid}>
                  <td className="border text-black border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border text-black border-gray-300 px-4 py-2">{player.fullName}</td>
                  <td className="border text-black border-gray-300 px-4 py-2">{player.aadharCardNumber}</td>
                  <td className="border text-black border-gray-300 px-4 py-2">{player.dob}</td>
                  <td className="border text-black border-gray-300 px-4 py-2">{player.eventName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlayerList
