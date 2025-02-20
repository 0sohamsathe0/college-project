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


  const acceptPlayer = async (pid) => {
    try {
      const pidno = Number(pid);
      const url =`http://localhost:3500/admin/accept-player/${pidno}`;
      console.log(url);
      
      let response = await axios.post(url);
      console.log(response.message);
      location.reload()
      
    } catch (error) {
      console.error("Error accepting player:", error);
    }
  }

  const rejectPlayer = async (pid) => {
    try {
      const pidno = Number(pid);
      const url =`http://localhost:3500/admin/reject-player/${pidno}`;
      console.log(url);
      
      let response = await axios.post(url);
      console.log(response.message);
      location.reload()
      
    } catch (error) {
      console.error("Error accepting player:", error);
    }
    window.location.reload();
  }



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
                  <td className="border text-black border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border text-black border-gray-300 px-4 py-2">{request.fullName}</td>
                  <td className="border text-black border-gray-300 px-4 py-2">{request.aadharCardNumber}</td>
                  <td className="border text-black border-gray-300 px-4 py-2">{request.dob}</td>
                  <td className="border text-black border-gray-300 px-4 py-2">{request.eventName}</td>
                  <td className="border text-black border-gray-300 px-4 py-2"><button className='bg-green-600 text-white rounded-md  p-2' onClick={()=>acceptPlayer(request.pid)}>Accept</button></td>
                  <td className="border text-black border-gray-300 px-4 py-2"><button className='bg-red-600 text-white rounded-md  p-2' onClick={()=>rejectPlayer(request.pid)}>Reject</button></td>
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
