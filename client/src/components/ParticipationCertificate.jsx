import React, { useState, useEffect } from "react";
import axios from "axios";
import { use } from "react";

const ParticipationCertificate = () => {
  const [certificate, setCertificate] = useState("");
  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [data, setData] = useState({ pid:1, tid:1});
  const [photo,setPhoto]=useState(null)


 const handleDataChange = (e)=>{
  const {name , value} = e.target;
  setData((prev)=>{
    return {
      ...prev,
      [name]:value
    }
  })
 }

 const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  setPhoto(file);
};

  const addMerit = async(e) => {
    const form_data = new FormData();
    Object.keys(data).forEach((key) => {
      form_data.append(key, data[key]);
    });

    form_data.append("certificatePhoto", photo);

    for (let [key, value] of form_data.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post("http://localhost:3500/admin/add-certificate/participation", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("post req is made");

      console.log(response.data);
    e.preventDefault();
    
  };

  const fetchPlayers = async () => {
    try {
      let response = await axios.get(
        "http://localhost:3500/players/all-players"
      );
      setPlayers(response.data);

      response = await axios.get(
        "http://localhost:3500/admin/getAllTournaments"
      );
      setTournaments(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="w-full bg-white rounded-md mt-3 flex flex-col justify-center">
      <h1 className="w-full text-center font-bold py-4 text-xl">
        Add Participation Certificate
      </h1>
      <div className="flex justify-center items-center gap-3 py-3">
        <p className="font-bold text-md">Player Name :</p>
        <select className="w-[30%]" name="pid"onChange={handleDataChange}>
          {players.map((player) => {
            return (
              <option key={player.pid} value={player.pid}>
                {player.fullName}{player.pid}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-center items-center gap-3 py-3">
        <p className="font-bold text-md">Tournament Title :</p>
        <select className="w-[30%]" name="tid" onChange={handleDataChange}>
          {tournaments.map((player) => {
            return (
              <option key={player.tid} value={player.tid}>
                {player.title}{player.tid}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col w-full justify-center items-center gap-3">
        <div>
          <p className="font-bold text-md float-left">Add Certificate :</p>
          <input
            type="file"
            onChange={handlePhotoChange}
            value={certificate}
            className="inline-block"
            name="path"
          />
        </div>
        <button
          onClick={addMerit}
          className="p-3 bg-blue-600 text-white font-bold rounded-md w-[30%] m-3"
        >
          Add Participation Certificate
        </button>
      </div>
    </div>
  );
};

export default ParticipationCertificate;
