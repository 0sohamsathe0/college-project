import React, { useState } from "react";
import axios from "axios";

const Tournaments = () => {
  const [formData, setFormData] = useState({
    title: "",
    locationState: "",
    locationCity: "",
    tlevel: "",
    ageCategory: "",
    startingDate: "",
    endDate: "",
  });

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTournament = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:3500/admin/add-tournament",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Tournament added:", response.data);
      alert("Tournament Added Successfully");
    } catch (error) {
      console.error("Error adding tournament:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Add New Tournament
      </h1>
      <form onSubmit={addTournament} className="space-y-5">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Tournament Name</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleDataChange}
            className="p-2 border border-black rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Location State</label>
          <input
            type="text"
            name="locationState"
            value={formData.locationState}
            onChange={handleDataChange}
            className="p-2 border border-black rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Location City</label>
          <input
            type="text"
            name="locationCity"
            value={formData.locationCity}
            onChange={handleDataChange}
            className="p-2 border border-black rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Tournament Level</label>
            <select
              name="tlevel"
              value={formData.tlevel}
              onChange={handleDataChange}
              className="p-2 border border-black rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Tournament Level</option>
              <option value="District">District</option>
              <option value="State">State</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Age Category</label>
            <select
              name="ageCategory"
              value={formData.ageCategory}
              onChange={handleDataChange}
              className="p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Age Category</option>
              <option value="10">U10</option>
              <option value="12">U12</option>
              <option value="14">U14</option>
              <option value="17">U17</option>
              <option value="19">U19</option>
              <option value="65">Open</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Start Date</label>
            <input
              type="date"
              name="startingDate"
              value={formData.startingDate}
              onChange={handleDataChange}
              className="p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleDataChange}
              className="p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Add Tournament
        </button>
      </form>
    </div>
  );
};

export default Tournaments;
