import { React, useRef, useState } from "react";
import PlayerLoginImage from "../assets/PlayerLoginImage.png";
import Logo from "../assets/Logo.png";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlayerLogin = () => {
  const inputReference = useRef(null);
  const navigate = useNavigate();

  const [playerLogin, setPlayerLogin] = useState({
    aadharCardNumber: "",
    dob: "",
  });

  //const [storePlayerLoginData, setStorePlayerLoginData] = useState({});  //send state on backend

  let propertyName, propertyValue;
  const loginUser = (event) => {
    propertyName = event.target.name;
    propertyValue = event.target.value;

    setPlayerLogin({ ...playerLogin, [propertyName]: propertyValue });
  };

  const handleRoute = () => {
    navigate("/admin");
  };

  const sendPlayerLoginData = async (event) => {
    event.preventDefault();
    if (playerLogin.aadharCardNumber.toString().length != 12) {
      alert("Aadhar Card cannot contain more than 12 characters");
    } else {
      const data = JSON.stringify(playerLogin);

      try {
        let response = await axios.post(
          "http://localhost:3500/players/login",
          data,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log(response.data.token);
        document.cookie = `jwtToken=${response.data.token}`;
        navigate("/playerprofile");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setPlayerLogin({
      aadharCardNumber: "",
      dob: "",
    });
    console.log(playerLogin);
  };

  return (
    <>
      <div className="bg-blue-700 h-[89vh] px-[100px] flex justify-center items-center">
        <form
          method="post"
          className=" bg-white w-[80%] flex justify-between items-center pt-4 px-10 rounded-3xl text-white"
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
              <div className="w-full my-5 px-5">
                <label
                  htmlFor="aadharCardNumber"
                  className="font-bold text-xl text-black"
                >
                  Aadhar Card Number:
                </label>
                <input
                  type="number"
                  name="aadharCardNumber"
                  id="aadharCardNumber"
                  className="w-full h-[3rem] font-bold px-3 border border-black text-black my-2"
                  value={playerLogin.aadharCardNumber}
                  placeholder="0000-0000-0000"
                  maxLength="12"
                  onChange={loginUser}
                  ref={inputReference}
                />
              </div>
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
                  ref={inputReference}
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <button
                type="submit"
                className="text-xl text-white font-bold px-5 py-3 rounded-lg bg-blue-400 mb-5"
                onClick={sendPlayerLoginData}
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
