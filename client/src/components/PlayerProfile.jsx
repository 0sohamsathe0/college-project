import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const PlayerProfile = () => {
  const [playerAccount, setPlayerAccount] = useState({});
  const [participationCertificate, setParticipationCertificate] = useState({});
  const [meritCertificate, setMeritCertificate] = useState({});

  const navigate = useNavigate();

  const fetchPlayers = async () => {
    const token = Cookies.get('jwtToken');
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

 

  return (
    <>
     <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex justify-center items-center">
  <div className="w-full max-w-5xl bg-white shadow-2xl rounded-xl overflow-hidden">
    <div className="relative w-full h-[320px] bg-gradient-to-r from-blue-700 to-indigo-700 flex flex-col justify-center items-center">
      <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-white shadow-xl">
        <img src={playerAccount.photo} alt="Player Profile" className="w-full h-full object-cover" />
      </div>
      <h1 className="mt-4 text-3xl font-bold text-white">{playerAccount.fullName}</h1>
      <p className="text-gray-300 text-sm">Player Profile</p>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Personal Details</h2>
        <p className="text-gray-600"><strong>Gender:</strong> {playerAccount.gender}</p>
        <p className="text-gray-600"><strong>Date of Birth:</strong> {playerAccount.dob}</p>
        <p className="text-gray-600"><strong>Phone:</strong> {playerAccount.phone}</p>
        <p className="text-gray-600"><strong>Email:</strong> {playerAccount.email}</p>
        <p className="text-gray-600"><strong>Aadhar Card:</strong> {playerAccount.aadharCardNumber}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Address & Event</h2>
        <p className="text-gray-600"><strong>School/College:</strong> {playerAccount.schoolCollegeName}</p>
        <p className="text-gray-600"><strong>Pincode:</strong> {playerAccount.pincode}</p>
        <p className="text-gray-600"><strong>Address Line 1:</strong> {playerAccount.addressLine1}</p>
        <p className="text-gray-600"><strong>Address Line 2:</strong> {playerAccount.addressLine2}</p>
        <p className="text-gray-600"><strong>Event Name:</strong> {playerAccount.eventName}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Merit Certificate</h2>
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
              {meritCertificate.length > 0 &&
                meritCertificate.map((certificate, index) => (
                  <tr className="bg-gray-50" key={index}>
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{certificate.title}</td>
                    <td className="px-6 py-4 font-medium">
                      <a className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition" href={certificate.certificateUrl} target="_blank">Preview</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Participation Certificate</h2>
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
              {participationCertificate.length > 0 &&
                participationCertificate.map((certificate, index) => (
                  <tr className="bg-gray-50" key={index}>
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{certificate.title}</td>
                    <td className="px-6 py-4 font-medium">
                      <a className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition" href={certificate.certificateUrl} target="_blank">Preview</a>
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
        className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
        onClick={() => {
          document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          navigate("/playerLogin");
          window.location.reload();
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
