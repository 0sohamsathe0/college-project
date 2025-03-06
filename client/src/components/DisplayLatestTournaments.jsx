import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayLatestTournaments = () => {
  const [latest, setLatest] = useState([]);

  const latestTournaments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/admin/latest-tournaments"
      );
      let data = await res.data["filtered"];
      setLatest(data);
    } catch (error) {
      console.log("error fetching data");
    }
  };

  useEffect(() => {
    latestTournaments();
  }, []);

  return (
    <div className="p-10 overflow-x-scroll">
        <h1 className="text-center text-[2rem] m-2 text-[#0e0e51] font-bold">Our Latest Tournaments Played</h1>
      <table className="overflow-x-scroll w-full text-sm text-left rtl:text-right bg-yellow-600">
        <thead className="text-xs text-gray-900 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tournament Name
            </th>
            
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Level
            </th>
            <th scope="col" className="px-6 py-3">
              Age Category
            </th>
          </tr>
        </thead>
        <tbody>
          {
            latest.length > 0 &&
            latest.map((singleLatestTournament,index)=>(

                <tr className="bg-white" key={index+1}>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap"
                ><h1>{singleLatestTournament.title}</h1></td>
              <td className="px-6 py-4">{singleLatestTournament.locationCity}</td>
              <td className="px-6 py-4">{singleLatestTournament.tlevel}</td>
              <td className="px-6 py-4">{singleLatestTournament.ageCategory}</td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default DisplayLatestTournaments;
