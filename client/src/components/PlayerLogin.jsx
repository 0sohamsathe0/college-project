import { React, useEffect, useRef, useState } from 'react'
import PlayerLoginImage from "../assets/PlayerLoginImage.png"
import Logo from "../assets/Logo.png"
import "../App.css"



const PlayerLogin = () => {


    const inputReference = useRef(null);


    const [playerLogin, setPlayerLogin] = useState({
        aadhar: "",
        dob: "",
    })

    const [storePlayerLoginData, setStorePlayerLoginData] = useState({});  //send state on backend



    let propertyName, propertyValue;
    const loginUser = (event) => {
        propertyName = event.target.name;
        propertyValue = event.target.value;

        setPlayerLogin({ ...playerLogin, [propertyName]: propertyValue });

    }




    useEffect(() => {
        console.log(status)
    }, [status])
    const sendPlayerLoginData = (event) => {
        event.preventDefault();
        if (playerLogin.aadhar.length != 12) {
            alert("Aadhar Card cannot contain more than 12 characters")
        }
        else {

            setStorePlayerLoginData(playerLogin)
            console.log(status);
            dispatch(changePlayerAccountStatus())
            console.log(status);
        }


        setPlayerLogin({
            aadhar: "",
            dob: "",
        })
        console.log(playerLogin)
    }




    return (
        <>
            <div className='bg-gradient-to-tl from-blue-800 to-blue-700 h-full pt-24 px-[100px]'>
                <form method="post" className='bg-white flex justify-between items-between pt-5 px-10 rounded-3xl text-white'>
                    <div className="loginImage w-1/2">
                        <img src={PlayerLoginImage} alt="Login Image" className='w-full' />
                    </div>
                    <div className="loginInfo w-1/2 flex flex-col items-center">
                        <img src={Logo} alt="logo" className='w-[200px]' />
                        <div className='flex justify-between items-center w-full'>
                            <span className='w-[40%] border border-black'></span>
                            <h1 className='w-[60%] text-center font-extrabold text-black text-3xl'>Player Login</h1>
                            <span className='w-[40%] border border-black'></span>
                        </div>
                        <div className="my-5 w-full">
                            <div className='w-full my-5 px-5'>
                                <label htmlFor="aadhar" className='font-bold text-xl text-black'>Aadhar Card Number:</label>
                                <input type="number" name="aadhar" id="aadhar" className='w-full h-[3rem] font-bold px-3 border border-black text-black my-2' value={playerLogin.aadhar} placeholder='0000-0000-0000' maxLength="12" onChange={loginUser} ref={inputReference} />
                            </div>
                            <div className='w-full my-5 px-5'>
                                <label htmlFor="dob" className='font-bold text-xl text-black'>Date Of Birth:</label>
                                <input type="date" name="dob" id="dobLogin" className='w-full h-[3rem] font-bold px-3 border border-black text-black my-2' value={playerLogin.dob} onChange={loginUser} ref={inputReference} />
                            </div>
                        </div>
                        <div className=''>
                            <button type="submit" className='text-xl text-white font-bold px-5 py-3 rounded-lg bg-blue-400 mb-5' onClick={sendPlayerLoginData}>Login</button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default PlayerLogin

