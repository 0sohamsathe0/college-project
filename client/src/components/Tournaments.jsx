import React, { useState } from "react";

const Tournaments = () => {
  const [formData, setFormData] = useState({
    tid: "",
    title: "",
    locationState: "",
    locationCity: "",
    tLevel: "",
    ageCategory: "",
    StartDate: "",
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
    const form_data = new FormData();
    Object.keys(data).forEach((key) => {
      form_data.append(key, data[key]);
    });

    form_data.append("certificatePhoto", photo);

    const response = await axios.post(
      "http://localhost:3500/admin/add-certificate/participation",
      form_data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("post req is made");

    console.log(response.data);
    e.preventDefault();
  };

  return (
    <>
      <form className="w-full bg-white rounded-md mt-3">
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
          />
        </div>

        <div className="w-full flex justify-between gap-4 px-20 py-3">
          {/* Left Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <div className="flex justify-around items-center">
              <p className="font-bold text-md">Tournament Level:</p>
              <select
                className="w-[60%] border border-black rounded"
                name="tid"
                onChange={handleDataChange}
              >
                <option value="district">District</option>
                <option value="state">State</option>
                <option value="national">National</option>
                <option value="international">International</option>
              </select>
            </div>
            <div className="flex justify-around items-center">
              <p className="font-bold text-md">Age Category :</p>
              <select
                className="w-[60%] border border-black rounded"
                name="tid"
                onChange={handleDataChange}
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
              <label htmlFor="StartDate" className="font-bold">
                Start Date:
              </label>
              <input
                type="date"
                name="StartDate"
                value={formData.StartDate}
                onChange={handleDataChange}
                className="w-[60%] border border-black rounded"
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
              />
            </div>
          </div>
        </div>

        <button
          className="px-3 bg-blue-600 text-white text-center py-3 mx-5 my-3 rounded-md font-semibold"
          onClick={addTournament}>
          Add Tournament
        </button>
      </form>
    </>
  );
};

export default Tournaments;
