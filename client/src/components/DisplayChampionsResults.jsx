import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayChampionsResults = () => {

    const [championResult, setChampionResult] = useState([]);

    const latestTournaments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3500/admin/getChampionshipResult"
        );
        let data = await res.data;
        setChampionResult(data);
      } catch (error) {
        console.log("error fetching data");
      }
    };
  
    useEffect(() => {
      latestTournaments();
    }, []);


  return (
    <div>
      <div className="p-10 overflow-x-scroll">
      <h1 className="text-center text-[2rem] m-2 text-[#0e0e51] font-bold">Our Champions Results</h1>
      <table className=" w-full text-sm text-left rtl:text-right bg-yellow-600">
        <thead className="text-xs text-gray-900 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tournament Name
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Age Category
            </th>
            <th scope="col" className="px-6 py-3">
              Level
            </th>
            <th scope="col" className="px-6 py-3">
                Position
            </th>
          </tr>
        </thead>
        <tbody>
          {
            championResult.length > 0 &&
            championResult.map((singleChampionResult,index)=>(

                <tr className="bg-white" key={index+1}>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap"
                ><h1>{singleChampionResult.title}</h1></td>
              <td className="px-6 py-4">{singleChampionResult.gender}</td>
              <td className="px-6 py-4">{singleChampionResult.ageCategory}</td>
              <td className="px-6 py-4">{singleChampionResult.tlevel}</td>
              <td className="px-6 py-4">{singleChampionResult.position}</td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default DisplayChampionsResults
