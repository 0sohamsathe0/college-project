import { React, useState } from "react";
import PlayerLoginImage from "../assets/PlayerLoginImage.png";
import Logo from "../assets/Logo.png";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlayerLogin = () => {
  const navigate = useNavigate();

  const [playerLogin, setPlayerLogin] = useState({
    aadharCardNumber: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  const loginUser = (event) => {
    const { name, value } = event.target;
    setPlayerLogin({ ...playerLogin, [name]: value });

    // Clear validation error when user types
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    // Aadhaar Number Validation
    if (!playerLogin.aadharCardNumber) {
      newErrors.aadharCardNumber = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(playerLogin.aadharCardNumber)) {
      newErrors.aadharCardNumber = "Aadhaar must be exactly 12 digits";
    }

    // Date of Birth Validation
    if (!playerLogin.dob) {
      newErrors.dob = "Date of Birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendPlayerLoginData = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:3500/players/login",
        JSON.stringify(playerLogin),
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response.data.token);
      document.cookie = `jwtToken=${response.data.token}`;
      navigate("/playerprofile");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRoute = () => {
    navigate("/admin");
  };

  return (
    <>
      <div className="bg-blue-700 h-[89vh] px-[100px] flex justify-center items-center">
        <form
          onSubmit={sendPlayerLoginData}
          className="bg-white w-[80%] flex justify-between items-center pt-4 px-10 rounded-3xl text-white"
        >
          <div className="loginImage w-1/2">
            <img src={PlayerLoginImage} alt="Login Image" className="w-full" />
          </div>
          <div className="loginInfo w-1/2 flex flex-col items-center">
            <img src={Logo} alt="logo" className="w-[200px]" />
            <div className="flex justify-between items-center w-full">
              <span className="w-[40%] border border-black"></span>
              <h1 className="w-[60%] text-center font-extrabold text-black text-3xl">
                Player Login
              </h1>
              <span className="w-[40%] border border-black"></span>
            </div>
            <div className="my-5 w-full">
              {/* Aadhaar Input */}
              <div className="w-full my-5 px-5">
                <label
                  htmlFor="aadharCardNumber"
                  className="font-bold text-xl text-black"
                >
                  Aadhaar Card Number:
                </label>
                <input
                  type="text"
                  name="aadharCardNumber"
                  id="aadharCardNumber"
                  className="w-full h-[3rem] font-bold px-3 border border-black text-black my-2"
                  placeholder="0000-0000-0000"
                  value={playerLogin.aadharCardNumber}
                  onChange={loginUser}
                />
                {errors.aadharCardNumber && (
                  <p className="text-red-500">{errors.aadharCardNumber}</p>
                )}
              </div>

              {/* Date of Birth Input */}
              <div className="w-full my-5 px-5">
                <label htmlFor="dob" className="font-bold text-xl text-black">
                  Date Of Birth:
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dobLogin"
                  className="w-full h-[3rem] font-bold px-3 border border-black text-black my-2"
                  value={playerLogin.dob}
                  onChange={loginUser}
                />
                {errors.dob && <p className="text-red-500">{errors.dob}</p>}
              </div>
            </div>

            <div className="flex space-x-5">
              <button
                type="submit"
                className="text-xl text-white font-bold px-5 py-3 rounded-lg bg-blue-400 mb-5"
              >
                Login
              </button>

              <button
                type="button"
                className="text-xl text-white font-bold px-5 py-3 rounded-lg bg-blue-400 mb-5"
                onClick={handleRoute}
              >
                Login as Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlayerLogin;
