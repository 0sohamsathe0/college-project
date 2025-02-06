import React, { useState, useEffect } from "react";
import axios from "axios";

//googlesheet url
// https://script.google.com/macros/s/AKfycbyr_fd3NtVlNQ6W7q-jsq01hwGBjyv4KSvHpJN5Mab-zLbwFW4elO1P1yJi67P6Gka6/exec

const CreateEntry = () => {
  const [epeePlayers, setEpeePlayers] = useState([]);
  const [foilPlayers, setFoilPlayers] = useState([]);
  const [sabrePlayers, setSabrePlayers] = useState([]);
  const [gender, setGender] = useState("Male");
  const [playerNameArray, setPlayerNameArray] = useState([]);
  const [selectTournament, setSelectTournament] = useState();
  const [tournamentList, setTournamentList] = useState([]);
  const [playerList, setPlayerList] = useState([]);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };

  const fetchData = async () => {
    try {
      let response = await axios.get(
        "http://localhost:3500/admin/getAllTournaments"
      );
      setTournamentList(response.data);

      response = await axios.get(
        "http://localhost:3500/players/all-players"
      );
      setPlayerList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  useEffect(() => {
    if (playerList.length === 0) return; 

    const filterByGender = (eventName, genderValue) =>
      playerList.filter(
        (player) => player.eventName === eventName && player.gender === genderValue
      );

    setEpeePlayers(filterByGender("Epee", gender));
    setFoilPlayers(filterByGender("Foil", gender));
    setSabrePlayers(filterByGender("Sabre", gender));
  }, [playerList, gender,setGender]);

 
  useEffect(() => {
    fetchData();
  }, []);

  const handlePlayerChange = (name) => {
    setPlayerNameArray((prev) => [...prev, name]);
    console.log(playerNameArray);
  };

  const epeePlayerArray = () => {
    return epeePlayers
      .filter((player) => playerNameArray.includes(player.fullName))
      .map((player) => player.pid);
    
};
  const foilPlayerArray = () => {
    
    return foilPlayers
      .filter((player) => playerNameArray.includes(player.fullName))
      .map((player) => player.pid);
  };
  const sabrePlayerArray = () => {
    
    return sabrePlayers
      .filter((player) => playerNameArray.includes(player.fullName))
      .map((player) => player.pid);
  };

  const chooseTournament = (e) => {
    const pid = Number(e.target.value)

    const selectedTournament = tournamentList.find(tournament => tournament.tid === pid);
    const ageCategory = selectedTournament.ageCategory;
    
    console.log(selectedTournament);


    setSelectTournament(e.target.value);
    
    
    filterPlayerByTournament(ageCategory);
  };
  

  const filterPlayerByTournament = (ageCategory) =>
  {
    const calculateAge = (dob) => {
        const [day, month, year] = dob.split('/').map(Number);
        const birthDate = new Date(year, month - 1, day);
        
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

    console.log(ageCategory);
    let players = playerList;
    players.map((player) => {
        player.age = calculateAge(player.dob);   
    })


    const sortedPlayers = players.filter(player => player.age <= ageCategory);
    console.log(sortedPlayers);
    setPlayerList(sortedPlayers);
  }


  const exportPlayers = async (e) => {
    e.preventDefault();
    const dataToExport = {
      tournamentId: selectTournament,
      playerGender: gender,
      epeePlayers: epeePlayerArray(),
      foilPlayers: foilPlayerArray(),
      sabrePlayers: sabrePlayerArray(),
    };
    console.log(dataToExport);
  };

  return (
    <div className="w-full min-h-screen bg-blue-600 p-5">
      <div className="bg-white rounded-lg w-full mt-20 p-5">
        <h1 className="text-center text-2xl font-bold text-black p-5">
          Create Tournament Entry
        </h1>

        <form id="FormEle" onSubmit={exportPlayers}>
          <div className="w-full flex justify-between items-center">
           
            <select
              className="w-[50%]"
              id="tournamentSelect"
              onChange={chooseTournament}
              value={selectTournament}
            >
              {tournamentList &&
                tournamentList.map((tournament) => {
                  return (
                    <option key={tournament.tid} value={tournament.tid}>
                      {tournament.title}
                    </option>
                  );
                })}
            </select>

            
            <select
              className="w-[30%]"
              onChange={handleGenderChange}
              value={gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="w-full">
            <div className="w-full mt-2 border border-black rounded-lg p-3">
              <h1 className="font-bold text-xl pl-5">Epee</h1>
              {epeePlayers &&
                epeePlayers.map((player) => (
                  <div
                    key={player.pid}
                    className="w-full flex justify-between items-center p-2 border border-black rounded-lg mt-2"
                  >
                    <h1>{player.fullName}</h1>
                    <input
                      type="checkbox"
                      id={player.pid}
                      onChange={() => handlePlayerChange(player.fullName)}
                    />
                  </div>
                ))}
            </div>
            <div className="w-full mt-2 border border-black rounded-lg p-3">
              <h1 className="font-bold text-xl pl-5">Foil</h1>
              {foilPlayers &&
                foilPlayers.map((player) => (
                  <div
                    key={player.pid}
                    className="w-full flex justify-between items-center p-2 border border-black rounded-lg mt-2"
                  >
                    <h1>{player.fullName}</h1>
                    <input
                      type="checkbox"
                      id={player.pid}
                      onChange={() => handlePlayerChange(player.fullName)}
                    />
                  </div>
                ))}
            </div>
            <div className="w-full mt-2 border border-black rounded-lg p-3">
              <h1 className="font-bold text-xl pl-5">Sabre</h1>
              {sabrePlayers &&
                sabrePlayers.map((player) => (
                  <div
                    key={player.pid}
                    className="w-full flex justify-between items-center p-2 border border-black rounded-lg mt-2"
                  >
                    <h1>{player.fullName}</h1>
                    <input
                      type="checkbox"
                      id={player.pid}
                      onChange={() => handlePlayerChange(player.fullName)}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="w-max mt-5">
            <button className="bg-blue-600 text-white rounded-lg p-3 active:bg-blue-700">
              Export Players to PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEntry;
