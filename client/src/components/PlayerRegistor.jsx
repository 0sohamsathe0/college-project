import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
      navigate("/playerLogin")
    } catch (error) {
      console.log(error);

      console.error("There was an error registering the player!", error);
      alert("There was an error registering the player.");
    }
  };

  return (
     <div className="bg-gradient-to-b from-blue-700 to-blue-500 min-h-screen px-5 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-4xl border bg-white shadow-lg rounded-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Register Player
        </h2>

        <section>
          <h3 className="bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-t-lg">
            Player Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Event Name</label>
              <select
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select Event</option>
                <option value="Epee">Epee</option>
                <option value="Foil">Foil</option>
                <option value="Sabre">Sabre</option>
              </select>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-t-lg">
            Contact Details
          </h3>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <label className="block font-medium mb-2">Aadhar Card Number</label>
              <input
                type="text"
                name="aadharCardNumber"
                value={formData.aadharCardNumber}
                onChange={handleChange}
                required
                maxLength="12"
                pattern="\d{12}"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength="10"
                pattern="\d{10}"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-t-lg">
            Address Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium mb-2">Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                maxLength="6"
                pattern="\d{6}"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">School/College Name</label>
              <input
                type="text"
                name="schoolCollegeName"
                value={formData.schoolCollegeName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-t-lg">
            Uploads
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium mb-2">Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handlePhotoChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Aadhar Card Photo</label>
              <input
                type="file"
                name="aadharCardPhoto"
                onChange={handleAadharCardPhotoChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </section>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Register Player
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerRegister;
