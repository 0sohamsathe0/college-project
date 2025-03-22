import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PlayerProfile = () => {
  const [playerAccount, setPlayerAccount] = useState({});
  const [participationCertificate, setParticipationCertificate] = useState([]);
  const [meritCertificate, setMeritCertificate] = useState([]);
  const [upcomingTournaments, setUpcomingTournaments] = useState([]);

  const navigate = useNavigate();

  const fetchPlayers = async () => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      navigate("/playerLogin");
    } else {
      const response = await axios.get(
        "http://localhost:3500/players/verifyPlayer",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setUpcomingTournaments(response.data.upcomingTournaments);
      setPlayerAccount(response.data.player[0]);
      handleAccount(response.data.player[0].pid);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAccount = async (pid) => {
    try {
      let participationCertificates = await (
        await fetch(
          `http://localhost:3500/players/get-participation-certificates/${pid}`
        )
      ).json();
      let meritCertificates = await (
        await fetch(
          `http://localhost:3500/players/get-Merit-certificates/${pid}`
        )
      ).json();
      setMeritCertificate(meritCertificates);
      setParticipationCertificate(participationCertificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex justify-center items-center">
        <div className="w-full max-w-7xl bg-white shadow-2xl rounded-xl overflow-hidden">
          {/* Player Profile Header */}
          <div className="relative w-full h-[320px] bg-gradient-to-r from-blue-700 to-indigo-700 flex flex-col justify-center items-center">
            <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src={playerAccount.photo}
                alt="Player Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white">
              {playerAccount.fullName}
            </h1>
            <p className="text-gray-300 text-sm">Player Profile</p>
          </div>

          {/* Player Details Section */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Player Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Details */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                  Personal Details
                </h3>
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

              {/* Address & Event */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                  Address & Event
                </h3>
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
            </div>
          </div>

          {/* Upcoming Tournaments Section */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Upcoming Tournaments
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-900 uppercase">
                  <tr>
                    <th className="px-6 py-3">Sr.No</th>
                    <th className="px-6 py-3">Title of Tournament</th>
                    <th className="px-6 py-3">Age Category</th>
                    <th className="px-6 py-3">Location State</th>
                    <th className="px-6 py-3">Location City</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingTournaments.length > 0 ? (
                    upcomingTournaments.map((tournament, index) => (
                      <tr className="bg-gray-50" key={index}>
                        <td className="px-6 py-4 font-medium">{index + 1}</td>
                        <td className="px-6 py-4 font-medium">
                          {tournament.title}
                        </td>
                        <td className="px-6 py-4 font-medium">
                          {tournament.ageCategory}
                        </td>
                        <td className="px-6 py-4 font-medium">
                          {tournament.locationState}
                        </td>
                        <td className="px-6 py-4 font-medium">
                          {tournament.locationCity}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center">
                        No tournaments available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Certificates Section */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Certificates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Merit Certificates */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                  Merit Certificates
                </h3>
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-900 uppercase">
                    <tr>
                      <th className="px-6 py-3">Sr.No</th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meritCertificate.length > 0 ? (
                      meritCertificate.map((certificate, index) => (
                        <tr className="bg-gray-50" key={index}>
                          <td className="px-6 py-4 font-medium">{index + 1}</td>
                          <td className="px-6 py-4 font-medium">
                            {certificate.title}
                          </td>
                          <td className="px-6 py-4 font-medium">
                            <a
                              href={certificate.certificateUrl}
                              target="_blank"
                              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center">
                          No merit certificates
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                  Participation Certificate
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-900 uppercase">
                      <tr>
                        <th className="px-6 py-3">Sr.No</th>
                        <th className="px-6 py-3">Title of Tournament</th>
                        <th className="px-6 py-3">Preview Certificate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participationCertificate.length > 0 ? (
                        participationCertificate.map((certificate, index) => (
                          <tr className="bg-gray-50" key={index}>
                            <td className="px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 font-medium">
                              {certificate.title}
                            </td>
                            <td className="px-6 py-4 font-medium">
                              <a
                                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                                href={certificate.certificateUrl}
                                target="_blank"
                              >
                                Preview
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <td colspan="3">
                          No participation certificates assigned
                        </td>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className=" py-6 w-full flex justify-center items-center">
                <button
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
                  onClick={() => {
                    document.cookie =
                      "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    navigate("/playerLogin");
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerProfile;
