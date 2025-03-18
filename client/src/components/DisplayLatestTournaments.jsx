import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayLatestTournaments = () => {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    fetchLatestTournaments();
  }, []);

  const fetchLatestTournaments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/admin/latest-tournaments"
      );
      setLatest(res.data.filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold text-blue-900 mb-6">
        Latest Tournaments Played
      </h1>

      {latest.length === 0 ? (
        <p className="text-center text-gray-500">No tournaments available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((tournament, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {tournament.title}
              </h2>
              <p className="text-gray-600">
                📍 Location: {tournament.locationCity}
              </p>
              <p className="text-gray-600">📈 Level: {tournament.tlevel}</p>
              <p className="text-gray-600">
                🎯 Age Category:{" "}
                {tournament.ageCategory === 65
                  ? "OPEN"
                  : `U${tournament.ageCategory}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayLatestTournaments;
