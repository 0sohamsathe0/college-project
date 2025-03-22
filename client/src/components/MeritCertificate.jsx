import React, { useEffect, useState } from "react";
import axios from "axios";

const MeritCertificate = () => {
  const [tournament, setTournament] = useState([]);
  const [players, setPlayers] = useState([]);
  const [data, setData] = useState({ pid: 1, tid: 1 });
  const [photo, setPhoto] = useState({});

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const addMerit = async (e) => {
    e.preventDefault();
    const form_data = new FormData();
    Object.keys(data).forEach((key) => {
      form_data.append(key, data[key]);
    });
    form_data.append("certificatePhoto", photo);

    try {
      const response = await axios.post(
        "http://localhost:3500/admin/add-certificate/merit",
        form_data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Merit Certificate Added Successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading certificate:", error);
    }
  };

  const fetchTournaments = async () => {
    try {
    
      let response = await axios.get("http://localhost:3500/admin/getAllTournaments");
      setTournament(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPlayers = async(tid)=>{
    let response = await axios.get(`http://localhost:3500/players/all-players/${Number(tid)}`)
    setPlayers(response.data)
  }

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
      <h1 className="text-center font-bold text-2xl text-gray-800 mb-6">Add Merit Certificate</h1>
      <form onSubmit={addMerit} className="space-y-5">
        
        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Tournament Title</label>
          <select
            className="p-2 border rounded-md focus:ring focus:ring-blue-300"
            name="tid"
            onChange={ (e)=>{
              handleDataChange(e);
              fetchPlayers(e.target.value)}
            }
          >
            <option value="">Select Tournament</option>
            {tournament.map((t) => (
              <option key={t.tid} value={t.tid}>{t.title}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Player Name</label>
          <select
            className="p-2 border rounded-md focus:ring focus:ring-blue-300"
            name="pid"
            onChange={(e)=>{
              handleDataChange(e)
            }}
          >
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.pid} value={player.pid}>{player.fullName}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Upload Certificate</label>
          <input
            type="file"
            onChange={handlePhotoChange}
            className="p-2 border rounded-md focus:ring focus:ring-blue-300"
            name="path"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Add Merit Certificate
        </button>
      </form>
    </div>
  );
};

export default MeritCertificate;
