import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlayerProfile = () => {
  const [players, setPlayers] = useState([]);
  const [playerAccount, setPlayerAccount] = useState({});
  const [participationCertificate, setParticipationCertificate] = useState({});
  const [meritCertificate, setMeritCertificate] = useState({});
  const [event, setEvent] = useState("all");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  const fetchPlayers = async () => {
    const token = document.cookie.split("jwtToken=")[1];
    console.log(token);

    if (!token) {
      navigate("/playerLogin");
    } else {
      const response = await axios.get(
        "http://localhost:3500/players/verifyPlayer",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response data:", response.data.player[0]);
      setPlayerAccount(response.data.player[0]);
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
      console.error("Error fetching playerAccount account data:", error);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const filterByCategory = (players) => {
    if (category === "all") return players;

    return players.filter((playerAccount) => {
      const age = calculateAge(playerAccount.dob);
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
      event === "all"
        ? players
        : players.filter((playerAccount) => playerAccount.eventName === event)
    );
  };

  return (
    <>
      <div className="w-full min-h-screen bg-blue-700 ">
        
            <div
              key={playerAccount.pid}
              className=" w-full h-full flex justify-center flex-col items-center"
            >
              <div className="flex w-[80%] justify-center flex-col mb-5 items-center bg-white rounded-xl">
                <div className="w-[300px] rounded-[50%] h-[300px] mt-5">
                  <img
                    src={playerAccount.photo}
                    alt="photo"
                    className="w-full rounded-[50%] h-full"
                  />
                </div>

                <h1 className="m-0 text-[2rem]">{playerAccount.fullName}</h1>

                <div className="mt-3 text-xl w-full gap-12 flex justify-center items-center">
                  <div className="flex flex-col gap-3">
                    <p>Gender: {playerAccount.gender}</p>
                    <p>Dob: {playerAccount.dob}</p>
                    <p>Phone: {playerAccount.phone}</p>
                    <p>Email: {playerAccount.email}</p>
                    <p>Aadhar card number: {playerAccount.aadharCardNumber}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>School Name: {playerAccount.schoolCollegeName}</p>
                    <p>Pincode: {playerAccount.pincode}</p>
                    <p>Address 1: {playerAccount.aadressLine1}</p>
                    <p>Address 2: {playerAccount.aadressLine2}</p>
                    <p>Event Name: {playerAccount.eventName}</p>
                  </div>
                </div>
              </div>
            </div>
         
      </div>
    </>
  );
};

export default PlayerProfile;
