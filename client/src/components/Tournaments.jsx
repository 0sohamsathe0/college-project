import React, { useState } from 'react'

const Tournaments = () => {

  const [tournamentName, setTournamentName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")


  const addTournament = (e) => {
    e.preventDefault()
    console.log(tournamentName, startDate, endDate);
    alert("New Tournament is added")
    setTournamentName("")
    setStartDate("")
    setEndDate("")
  }


  return (
    <>
      <form className='w-full bg-white rounded-md mt-3'>
        <h1 className='w-full text-center font-bold py-4 text-xl'>Add New Tournament</h1>
        <div className='w-full flex justify-center gap-3 items-center px-3 py-3'>
          <label htmlFor="tournamentName" className='font-bold'>Tournament Name :</label>
          <input type="text" name="tournamentName" value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} className='w-[70%] border border-black' />
        </div>
        <div className='w-full flex justify-center gap-3 items-center px-3 py-3'>
          <label htmlFor="StartDate" className='font-bold'>Start Date :</label>
          <input type="date" name="StartDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-[70%] border border-black' />
        </div>
        <div className='w-full flex justify-center gap-3 items-center px-3 py-3'>
          <label htmlFor="EndDate" className='font-bold'>End Date :</label>
          <input type="date" name="EndDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-[70%] border border-black' />
        </div>

        <button className='px-3 bg-blue-600 text-white text-center py-3 mx-5 my-3 rounded-md font-semibold' onClick={(e) => addTournament(e)}>Add Tournament</button>
      </form>
    </>
  )
}

export default Tournaments
