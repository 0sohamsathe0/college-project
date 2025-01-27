import React, { useState } from "react";
import axios from "axios";

const PlayerRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    aadharCardNumber: "",
    eventName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    schoolCollegeName: "",
  });

  const [photo, setPhoto] = useState(null);
  const [aadharCardPhoto, setAadharCardPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleAadharCardPhotoChange = (e) => {
    setAadharCardPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo || !aadharCardPhoto) {
      alert("Both photo and aadharCardPhoto are required.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("photo", photo);
    console.log(photo);

    data.append("aadharCardPhoto", aadharCardPhoto);
    try {
      console.log("req started");
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post("http://localhost:3500/players", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("post req is made");

      console.log(response.data);
      alert("Player registered successfully!");
    } catch (error) {
      console.log(error);

      console.error("There was an error registering the player!", error);
      alert("There was an error registering the player.");
    }
  };

  return (
    <div className="bg-blue-700 min-h-screen  px-5 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-[80%] border mt-3 px-10 bg-white rounded-xl"
      >
      <h2 className="w-full text-center justify-center items-center text-[2rem] my-3 text-black">Register Player</h2>


          <h1 className="w-full bg-blue-600 py-3 rounded-t-xl rounded-tr-xl text-center text-white font-bold text-xl">Player Details</h1>
        

        <div className="w-full flex justify-start items-center mt-2">
        <div className="flex w-[40%] justify-start gap-2 text-center items-center">
          <label className="w-auto">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="border w-[60%] border-black"
          />
        </div>
          <div className="flex w-[20%] justify-center gap-2 text-center items-center">
            <label className="w-auto">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border w-[60%] border-black"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex w-[20%] justify-center gap-2 text-center items-center">
            <label className="w-auto">Date of Birth:</label>
            <input
              className="border w-[60%] border-black"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex w-[20%] justify-center gap-2 text-center items-center">
            <label className="w-auto">Event Name:</label>
            <select
              className="border w-[60%] border-black"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
            >
              <option value="">Select Event</option>
              <option value="Epee">Epee</option>
              <option value="Foil">Foil</option>
              <option value="Sabre">Sabre</option>
            </select>
          </div>
        </div>

        <h1 className="w-full bg-blue-600 py-3 mt-5 rounded-t-xl rounded-tr-xl text-center text-white font-bold text-xl">Contact Details</h1>


        <div className="w-full flex flex-col mt-2">
          <div className="flex w-full justify-center gap-5 mt-2 items-center ">
            <label className="w-auto">Aadhar Card Number:</label>
            <input
              type="text"
              name="aadharCardNumber"
              value={formData.aadharCardNumber}
              onChange={handleChange}
              required
              className="border w-[60%] border-black"
            />
          </div>
          <div className="flex w-full justify-center gap-5 mt-2 items-center">
            <label className="w-auto">Email:</label>
            <input
              className="border w-[60%] border-black"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex w-full justify-center gap-5 mt-2 items-center">
            <label className="w-auto">Phone:</label>
            <input
              className="border w-[60%] border-black"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
        </div>



        <h1 className="w-full bg-blue-600 py-3 mt-5 rounded-t-xl rounded-tr-xl text-center text-white font-bold text-xl">Address Details</h1>

        
        <div className="w-full flex justify-start items-center mt-2">
          <div className="flex w-[50%] justify-between text-center items-center">
            <label className="w-auto px-5">Address Line 1:</label>
            <input
              className="border w-[70%] border-black"
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex w-[50%] justify-between text-center items-center">
            <label className="w-auto px-5">Address Line 2:</label>
            <input
              className="border w-[70%] border-black"
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              required
            />
          </div>
        </div>

       <div className="w-full flex justify-start items-center mt-2">
       <div className="flex w-[50%] justify-between text-center items-center">
          <label className="w-auto px-5">Pincode:</label>
          <input className="border w-[70%] border-black"
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex w-[50%] justify-start items-center">
          <label className="w-auto px-5">School/College Name:</label>
          <input className="border w-full border-black"
            type="text"
            name="schoolCollegeName"
            value={formData.schoolCollegeName}
            onChange={handleChange}
            required
          />
        </div>
       </div>

       <div  className="w-full flex justify-start items-center mt-2">
        <div className="flex w-[50%] justify-between text-center items-center">
          <label className="w-auto px-5">Photo:</label>
          <input className="w-auto "
            type="file"
            name="photo"
            onChange={handlePhotoChange}
            required
          />
        </div>
        <div className="flex w-[50%] justify-between text-center items-center">
          <label className="w-auto px-5">Aadhar Card Photo:</label>
          <input className="w-auto "
            type="file"
            name="aadharCardPhoto"
            onChange={handleAadharCardPhotoChange}
            required
          />
        </div>
        </div>

       
       <div className="w-full text-center my-3">
       <button type="submit" className="py-3 px-5 rounded-lg bg-blue-600 text-white font-bold">Register Player</button>
       </div>


        
      </form>
    </div>
  );
};

export default PlayerRegister;
