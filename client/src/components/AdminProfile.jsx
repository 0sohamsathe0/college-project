import React from "react";
import { Link, Routes, Route, Outlet,Navigate, useNavigate } from "react-router-dom";
import Tournaments from "./Tournaments.jsx";
import ParticipationCertificate from "./ParticipationCertificate.jsx";
import MeritCertificate from "./MeritCertificate.jsx";
import PlayerRequestQueue from "./PlayerRequestQueue.jsx";
import { useState,useEffect } from "react";
import axios from "axios";
import CreateEntry from "./CreateEntry.jsx";

const AdminProfile = () => {
    const [event, setEvent] = useState("all");
    const [category, setCategory] = useState("all");
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    const fetchPlayers = async () => {
      
      let isLoggedIn;
      if(document.cookie.split("loginState=")[1]){
        isLoggedIn = true;
      }
      if(!isLoggedIn){
        navigate("/admin");
      }
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
      const [day, month, year] = dob.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      
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
    <div className="flex flex-col min-h-screen text-black">
      {/* Header Section */}
      <header className="bg-white text-black shadow-lg py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {document.cookie = "loginState=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; navigate('/admin'); window.location.reload()}}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-gray-100 text-black shadow-inner p-6 flex flex-col gap-4">
          <Link
            to="playerRequests"
            className="block bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600"
          >
            Player Requests
          </Link>
          <Link
            to="tournaments"
            className="block bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600"
          >
            Tournaments
          </Link>
          <Link
            to="participationCertificate"
            className="block bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600"
          >
            Add Participation Certificate
          </Link>
          <Link
            to="meritCertificate"
            className="block bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600"
          >
            Add Merit Certificate
          </Link>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="playerRequests" replace />} />
            <Route path="playerRequests" element={<PlayerRequestQueue />} />
            <Route path="tournaments" element={<Tournaments />} />
            <Route path="participationCertificate" element={<ParticipationCertificate />} />
            <Route path="meritCertificate" element={<MeritCertificate />} />
          </Routes>

          {/* Player Table */}

          <div className="mt-8 bg-white text-black shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-200">
              <h2 className="text-lg font-semibold">Player List</h2>
              <div className="flex justify-between mt-4">
                <select
                  name="Event"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none"
                >
                  <option value="all">All players</option>
                  <option value="Epee">Epee</option>
                  <option value="Foil">Foil</option>
                  <option value="Sabre">Sabre</option>
                </select>

                <select
                  name="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none"
                >
                  <option value="all">Category</option>
                  <option value="U10">U10</option>
                  <option value="U12">U12</option>
                  <option value="U14">U14</option>
                  <option value="U17">U17</option>
                  <option value="U19">U19</option>
                  <option value="open">Open</option>
                </select>
              </div>
            </div>

            <table className="w-full text-left text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4">Player ID</th>
                  <th className="p-4">Full Name</th>
                  <th className="p-4">Event</th>
                  <th className="p-4">Date of Birth</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers().length > 0 ? (
                  sortedPlayers().map((player) => (
                    <tr key={player.pid} className="border-t">
                      <td className="p-4">SFA {player.pid}</td>
                      <td className="p-4">{player.fullName}</td>
                      <td className="p-4">{player.eventName}</td>
                      <td className="p-4">{player.dob}</td>
                      <td className="p-4">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          onClick={() => handleAccount(player.pid)}
                        >
                          Edit Profile
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No players found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
          <CreateEntry/>
        </main>
      </div>
    </div>
    </>
  );
};

export default AdminProfile;
