import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlayerProfile = () => {
  const [playerAccount, setPlayerAccount] = useState({});
  const [participationCertificate, setParticipationCertificate] = useState({});
  const [meritCertificate, setMeritCertificate] = useState({});

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
      handleAccount(response.data.player[0].pid);
    }
  };
  console.log(meritCertificate, participationCertificate);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAccount = async (pid) => {
    try {
      let participationCertificateData = await fetch(
        `http://localhost:3500/players/get-participation-certificates/${pid}`
      );
      let meritCertificateData = await fetch(
        `http://localhost:3500/players/get-Merit-certificates/${pid}`
      );
      let participationCertificates = await participationCertificateData.json();
      let meritCertificates = await meritCertificateData.json();
      setMeritCertificate(meritCertificates);
      setParticipationCertificate(participationCertificates);
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
      <div className="w-full min-h-screen  p-6 flex justify-center items-center">
        <div className="w-[80%] bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="relative w-full h-[300px] bg-gradient-to-r from-blue-500 to-blue-700">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={playerAccount.photo}
                  alt="Player Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {playerAccount.fullName}
            </h1>
            <p className="text-gray-500 text-sm">Player Profile</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                Personal Details
              </h2>
              <p className="text-gray-600">
                <strong>Gender:</strong> {playerAccount.gender}
              </p>
              <p className="text-gray-600">
                <strong>Date of Birth:</strong> {playerAccount.dob}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {playerAccount.phone}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {playerAccount.email}
              </p>
              <p className="text-gray-600">
                <strong>Aadhar Card:</strong> {playerAccount.aadharCardNumber}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                Address & Event
              </h2>
              <p className="text-gray-600">
                <strong>School/College:</strong>{" "}
                {playerAccount.schoolCollegeName}
              </p>
              <p className="text-gray-600">
                <strong>Pincode:</strong> {playerAccount.pincode}
              </p>
              <p className="text-gray-600">
                <strong>Address Line 1:</strong> {playerAccount.addressLine1}
              </p>
              <p className="text-gray-600">
                <strong>Address Line 2:</strong> {playerAccount.addressLine2}
              </p>
              <p className="text-gray-600">
                <strong>Event Name:</strong> {playerAccount.eventName}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                Merit Certificate
              </h2>

              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Sr.No
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Title of Tournament
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Preview Certificate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {meritCertificate.length > 0 &&
                      meritCertificate.map((certificate, index) => (
                        <tr class="bg-white dark:bg-gray-800" key={index}>
                          <th
                            scope="row"
                            class="px-2 py-4 font-medium text-black whitespace-nowrap"
                          >
                            {index + 1}
                          </th>
                          <td class="px-6 py-4 font-medium text-black">
                            {certificate.title}
                          </td>
                          <td class="px-6 py-4 font-medium">
                            <a className="bg-blue-400 text-white rounded-sm px-3 py-2" href={certificate.certificateUrl} target="_blank">
                              Preview
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                Participation Certificate
              </h2>
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Sr.No
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Title of Tournament
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Preview Certificate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {participationCertificate.length > 0 &&
                      participationCertificate.map((certificate, index) => (
                        <tr class="bg-white dark:bg-gray-800" key={index}>
                          <th
                            scope="row"
                            class="px-2 py-4 font-medium text-black whitespace-nowrap"
                          >
                            {index + 1}
                          </th>
                          <td class="px-6 py-4 font-medium text-black">
                            {certificate.title}
                          </td>
                          <td class="px-6 py-4 font-medium">
                            <a className="bg-blue-400 text-white rounded-sm px-3 py-2" href={certificate.certificateUrl} target="_blank">
                              Preview
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="p-6 flex justify-center">
            <button
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition duration-300"
              onClick={() => {
                document.cookie =
                  "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                navigate("/playerLogin");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerProfile;
