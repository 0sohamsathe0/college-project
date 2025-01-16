import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlayerRequestQueue = () => {
  const [requests, setRequests] = useState([]);

  const fetchPlayers = async () => {
    try {
      let response = await axios.get("http://localhost:3500/admin/reqest-queue");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Player Request Queue</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left rounded-lg">
          <thead className="bg-yellow-500">
            <tr >
              <th className=" px-4 py-2">Sr. No</th>
              <th className=" px-4 py-2">Name</th>
              <th className=" px-4 py-2">AadharCard No</th>
              <th className=" px-4 py-2">DOB</th>
              <th className=" px-4 py-2">Event</th>
              <th className=" px-4 py-2">Accept</th>
              <th className=" px-4 py-2">Reject</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <tr key={request.pid}>
                  <td className="border text-white border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border text-white border-gray-300 px-4 py-2">{request.fullName}</td>
                  <td className="border text-white border-gray-300 px-4 py-2">{request.aadharCardNumber}</td>
                  <td className="border text-white border-gray-300 px-4 py-2">{request.dob}</td>
                  <td className="border text-white border-gray-300 px-4 py-2">{request.eventName}</td>
                  <td className="border text-white border-gray-300 px-4 py-2"><button className='bg-green-600 text-white rounded-md  p-2'>Accept</button></td>
                  <td className="border text-white border-gray-300 px-4 py-2"><button className='bg-red-600 text-white rounded-md  p-2'>Reject</button></td>
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
  );
};

export default PlayerRequestQueue;
