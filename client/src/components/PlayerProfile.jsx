import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Certificates from "./Certificates";

const PlayerProfile = () => {
  const [players, setPlayers] = useState([]);
  const [playerAccount, setPlayerAccount] = useState({});
  const [participationCertificate, setParticipationCertificate] = useState({});
  const [meritCertificate, setMeritCertificate] = useState({});
  const [event, setEvent] = useState("all");
  const [dobSort, setDobSort] = useState(""); // "asc" or "desc"

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

  const handleAccount = async (pid) => {
    try {
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
    }
  };

  const sortedPlayers = () => {
    // Filter by event
    let filteredPlayers = event === "all" ? players : players.filter(player => player.eventName === event);

    // Sort by DOB
    if (dobSort === "asc") {
      filteredPlayers.sort((a, b) => new Date(a.dob) - new Date(b.dob));
    } else if (dobSort === "desc") {
      filteredPlayers.sort((a, b) => new Date(b.dob) - new Date(a.dob));
    }

    return filteredPlayers;
  };

  return (
    <>
      <div className="w-full -z-50 pt-24 px-10">
        <div className="container">
          <h1 className="text-2xl font-bold mb-5 text-white">
            Player Request Queue
          </h1>
          <div className="mt-5 overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-center rtl:text-right text-[#0b0b51]">
              <thead className="text-md text-[#0b0b51] uppercase bg-yellow-500">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Player Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <select
                      name="Event"
                      value={event}
                      onChange={(e) => setEvent(e.target.value)}
                      className="bg-yellow-500 text-black"
                    >
                      <option value="all">Event</option>
                      <option value="Epee">Epee</option>
                      <option value="Foil">Foil</option>
                      <option value="Sabre">Sabre</option>
                    </select>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <select
                      name="DOB"
                      value={dobSort}
                      onChange={(e) => setDobSort(e.target.value)}
                      className="bg-yellow-500 text-black"
                    >
                      <option value="">Sort by DOB</option>
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
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
                      <td className="px-6 py-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                          onClick={() => handleAccount(player.pid)}
                        >
                          Show Profile
                        </button>
                      </td>
                      <td className="px-6 py-4">{player.eventName}</td>
                      <td className="px-6 py-4">{player.dob}</td>
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

          <div>
            {playerAccount.length > 0 ? (
              playerAccount.map((player) => {
                return (
                  <div
                    key={player.pid}
                    className="pt-24 w-full h-full flex justify-center flex-col items-center"
                  >
                    <div className="flex w-[80%] justify-center flex-col mb-5 items-center bg-white rounded-xl">
                      <div className="w-[300px] rounded-[50%] h-[300px] mt-5">
                        <img
                          src={player.photo}
                          alt="photo"
                          className="w-full rounded-[50%] h-full"
                        />
                      </div>

                      <h1 className="m-0 text-[2rem]">{player.fullName}</h1>

                      <div className="mt-3 text-xl w-full gap-12 flex justify-center items-center">
                        <div className="flex flex-col gap-3">
                          <p>Gender: {player.gender}</p>
                          <p>Dob: {player.dob}</p>
                          <p>Phone: {player.phone}</p>
                          <p>Email: {player.email}</p>
                          <p>Aadhar card number: {player.aadharCardNumber}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <p>School Name: {player.schoolCollegeName}</p>
                          <p>Pincode: {player.pincode}</p>
                          <p>Address 1: {player.aadressLine1}</p>
                          <p>Address 2: {player.aadressLine2}</p>
                          <p>Event Name: {player.eventName}</p>
                        </div>
                      </div>
                    </div>
                    <Certificates
                      meritCertificate={meritCertificate}
                      participationCertificate={participationCertificate}
                    />
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerProfile;
