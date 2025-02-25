import React, { useState } from "react";
import axios from "axios";

const Tournaments = () => {
  const [formData, setFormData] = useState({
    title: "",
    locationState: "",
    locationCity: "",
    tlevel: "National",
    ageCategory: "",
    startingDate: "",
    endDate: "",
  });

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addTournament = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    const response = await axios.post(
      "http://localhost:3500/admin/add-tournament",
      data,
      {
        headers: {
            "Content-Type": "application/json",
        },
    }
    );
    console.log("post req is made");

    console.log(response.data);
  };

  return (
    <>
      <form className="w-full bg-white rounded-md mt-3 shadow-[0_20px_20px_rgba(0,0,0,0.25)]" onSubmit={addTournament}>
        <h1 className="w-full text-center font-bold py-4 text-xl">
          Add New Tournament
        </h1>
        <div className="w-full flex justify-center gap-3 items-center px-3 py-3">
          <label htmlFor="tournamentName" className="font-bold">
            Tournament Name :
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleDataChange}
            className="w-[70%] border border-black"
            required
          />
        </div>
        <div className="w-full flex justify-center gap-3 items-center px-3 py-3">
          <label htmlFor="locationState" className="font-bold">
            Location State :
          </label>
          <input
            type="text"
            name="locationState"
            value={formData.locationState}
            onChange={handleDataChange}
            className="w-[70%] border border-black"
            required
          />
        </div>
        <div className="w-full flex justify-center gap-3 items-center px-3 py-3">
          <label htmlFor="locationCity" className="font-bold">
            Location City :
          </label>
          <input
            type="text"
            name="locationCity"
            value={formData.locationCity}
            onChange={handleDataChange}
            className="w-[70%] border border-black"
            required
          />
        </div>

        <div className="w-full flex justify-between gap-4 px-20 py-3">
          {/* Left Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <div className="flex justify-around items-center">
              <p className="font-bold text-md">Tournament Level:</p>
              <select
                className="w-[60%] border border-black rounded"
                name="tlevel"
                value={formData.tlevel }
                onChange={handleDataChange}
                required
              >
                <option value="District" >District</option>
                <option value="State">State</option>
                <option value="National" >National</option>
                <option value="International">International</option>
              </select>
            </div>
            <div className="flex justify-around items-center">
              <p className="font-bold text-md">Age Category :</p>
              <select
                className="w-[60%] border border-black rounded"
                name="ageCategory"
                value={formData.ageCategory}
                onChange={handleDataChange}
                required
              >
                <option value="10">U10</option>
                <option value="12">U12</option>
                <option value="14">U14</option>
                <option value="17">U17</option>
                <option value="19">U19</option>
                <option value="65">Open</option>
              </select>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <div className="flex justify-around items-center">
              <label htmlFor="startingDate" className="font-bold">
                Start Date:
              </label>
              <input
                type="date"
                name="startingDate"
                value={formData.startingDate}
                onChange={handleDataChange}
                className="w-[60%] border border-black rounded"
                required
              />
            </div>
            <div className="flex justify-around items-center">
              <label htmlFor="endDate" className="font-bold">
                End Date:
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleDataChange}
                className="w-[60%] border border-black rounded"
                required
              />
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="Add Tournament"
          className="px-3 bg-blue-600 text-white text-center py-3 mx-5 my-3 rounded-md font-semibold"
          onClick={addTournament}
        />
      </form>
    </>
  );
};

export default Tournaments;
