import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChampionResult = () => {

    const[Alltournaments,setAllTournaments] = useState([]);
    const[singleTournament,setSingleTournament] = useState("");
    const[gender,setGender] = useState("M")
    const[position,setPosition] = useState("First")

    const fetchTournaments = async() =>{
        const resp = await axios.get("http://localhost:3500/admin/getAllTournaments");
        setAllTournaments(resp.data)
    }

    const selectSingletournament = (e)=>{
        setSingleTournament(e.target.value);
    }

    const selectGender = (e) =>{
        setGender(e.target.value)
        console.log(e.target.value);
    }

    const selectPosition = (e) =>{
        setPosition(e.target.value)
        console.log(e.target.value);
    }

    const addChamptionResult = async()=>{
        let data = {
            tid:Number(singleTournament),
            gender:gender,
            position:position,
        }
        const res = await axios.post("http://localhost:3500/admin/add-result/championship", data,{
            headers:{
                "Content-Type": "application/json",
            },
        });
        console.log(res.data);
        
    }
    



    useEffect(()=>{
        fetchTournaments()
    },[])

    return (
        <div>



            <table className="relative overflow-x-auto w-full text-sm text-left rtl:text-right bg-yellow-600">
                <thead className="text-xs text-gray-900 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Tournament Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Gender
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Position
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white">
                        <td scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        <select value={singleTournament} onChange={selectSingletournament}>
                            <option value="Select Tournament">Select Tournament</option>
                         {
                            Alltournaments.map((tournament)=>(
                                <option value={tournament.tid} key={tournament.tid}>{tournament.title}</option>
                            ))
                         }
                        </select>
                        </td>
                        <td className="px-6 py-4">
                            <select onChange={selectGender} value={gender}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </td>
                        <td className="px-6 py-4">
                        <select onChange={selectPosition} value={position}>
                                <option value="First">1st</option>
                                <option value="Second">2nd</option>
                                <option value="Third">3rd</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>


            <button className="bg-blue-600 text-white rounded-lg p-3 active:bg-blue-700" onClick={addChamptionResult}>
              Add Champion Result
            </button>

        </div>
    )
}

export default ChampionResult
