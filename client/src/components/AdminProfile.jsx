import React from "react";
import { Link, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Tournaments from "./Tournaments.jsx";
import ParticipationCertificate from "./ParticipationCertificate.jsx";
import MeritCertificate from "./MeritCertificate.jsx";
import PlayerRequestQueue from "./PlayerRequestQueue.jsx";
import { useState,useEffect } from "react";
import axios from "axios";

const AdminProfile = () => {

  
    const [event, setEvent] = useState("all");
    const [category, setCategory] = useState("all");
    const [players, setPlayers] = useState([]);
    const [participationCertificate, setParticipationCertificate] = useState({});
      const [meritCertificate, setMeritCertificate] = useState({});

    const fetchPlayers = async () => {
      try {
        let response = await axios.get(
          "http://localhost:3500/players/all-players"
        );
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      fetchPlayers();
    }, []);
  
    const handleAccount =  (pid) => {
      {/* try {
        let players = await fetch(`http://localhost:3500/players/${pid}`);
        let participationCertificateData = await fetch(
          `http://localhost:3500/players/get-participation-certificates/${pid}`
        );
        let meritCertificateData = await fetch(
          `http://localhost:3500/players/get-Merit-certificates/${pid}`
        );
        let playerData = await players.json();
        let participationCertificate = await participationCertificateData.json();
        let meritCertificate = await meritCertificateData.json();
        setPlayerAccount(playerData);
        setMeritCertificate(meritCertificate);
        setParticipationCertificate(participationCertificate);
      } catch (error) {
        console.error("Error fetching player account data:", error);
      } */}
      console.log(pid);
      
    };
  
    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };
  
    const filterByCategory = (players) => {
      if (category === "all") return players;
  
      return players.filter((player) => {
        const age = calculateAge(player.dob);
        switch (category) {
          case "U10":
            return age < 10;
          case "U12":
            return age < 12;
          case "U14":
            return age < 14;
          case "U17":
            return age >= 14 && age <= 17;
          case "U19":
            return age >= 14 && age <= 19;
          case "open":
            return age >= 14;
          default:
            return true;
        }
      });
    };
  
    const sortedPlayers = () => {
      return filterByCategory(
        event === "all" ? players : players.filter((player) => player.eventName === event)
      );
    };

  return (
    <>
    <div className="flex flex-row gap-5 min-h-screen bg-blue-700 pt-24">
      {/* Left Side (Links) */}
      <div className="w-2/5 h-full bg-white rounded-lg text-lg font-bold p-4 flex flex-col gap-3">
        <Link to="playerRequests">Player Requests</Link>
        <Link to="tournaments">Tournaments</Link>
        <Link to="participationCertificate">Add Participation Certificate</Link>
        <Link to="meritCertificate">Add Merit Certificate</Link>
      </div>

      {/* Right Side (Content) */}
      <div className="w-3/5">
        <Routes>
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="playerRequests" replace />} />

          {/* Child Routes */}
          <Route path="playerRequests" element={<PlayerRequestQueue />} />
          <Route path="tournaments" element={<Tournaments />} />
          <Route
            path="participationCertificate"
            element={<ParticipationCertificate />}
          />
          <Route path="meritCertificate" element={<MeritCertificate />} />
        </Routes>
      </div>
    </div>

    <div className="px-5 overflow-x-auto shadow-md  bg-blue-700">
            <table className="w-full text-sm text-center rounded-lg rtl:text-right text-[#0b0b51]">
              <thead className="text-md text-[#0b0b51] uppercase bg-yellow-500">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Player Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                 
                  <th scope="col" className="px-6 py-3">
                    <select
                      name="Event"
                      value={event}
                      onChange={(e) => setEvent(e.target.value)}
                      className="bg-yellow-500 text-black"
                    >
                      <option value="all">All players</option>
                      <option value="Epee">Epee</option>
                      <option value="Foil">Foil</option>
                      <option value="Sabre">Sabre</option>
                    </select>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <select
                      name="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-yellow-500 text-black"
                    >
                      <option value="all">Category</option>
                      <option value="U10">U10</option>
                      <option value="U12">U12</option>
                      <option value="U14">U14</option>
                      <option value="U17">U17</option>
                      <option value="U19">U19</option>
                      <option value="open">Open</option>
                    </select>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit Profile
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers().length > 0 ? (
                  sortedPlayers().map((player) => (
                    <tr
                      key={player.pid}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-black">SFA {player.pid}</td>
                      <td className="px-6 py-4">{player.fullName}</td>
                      
                      <td className="px-6 py-4">{player.eventName}</td>
                      <td className="px-6 py-4">{player.dob}</td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                          onClick={() => handleAccount(player.pid)}
                        >
                          Edit Profile
                        </button>
                      </td> 
                      {console.log(player.dob)}
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-2" colSpan="5">
                      No players found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
    </>
  );
};

export default AdminProfile;
