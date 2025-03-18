import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayChampionsResults = () => {
  const [championResult, setChampionResult] = useState([]);

  useEffect(() => {
    fetchChampionshipResults();
  }, []);

  const fetchChampionshipResults = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/admin/getChampionshipResult"
      );
      setChampionResult(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold text-blue-900 mb-6">
        🏆Championship Result
      </h1>

      {championResult.length === 0 ? (
        <p className="text-center text-gray-500">
          No championship results available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {championResult.map((champion, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {champion.title}
              </h2>
              <p className="text-gray-600">👤 {champion.gender}</p>
              <p className="text-gray-600">
                🎯 Age:{" "}
                {champion.ageCategory === 65
                  ? "OPEN"
                  : `U${champion.ageCategory}`}
              </p>
              <p className="text-gray-600">📍 Level: {champion.tlevel}</p>
              <p className="text-lg font-bold text-green-700">
                🏅 Position: {champion.position}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayChampionsResults;
