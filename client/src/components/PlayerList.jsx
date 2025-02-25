import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

const PlayerList = () => {
    const [event, setEvent] = useState("all");
    const [category, setCategory] = useState("all");
    const [players, setPlayers] = useState([])


    const sortedPlayers = () => {
        return filterByCategory(
            event === "all" ? players : players.filter((player) => player.eventName === event)
        );
    };


    const fetchPlayers = async() => {
        try {
            let response = await axios.get(
                "http://localhost:3500/players/all-players"
            );
            setPlayers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        fetchPlayers();
    }, [])


    const filterByCategory = (players) => {
        if (category === "all") return players;

        return players.filter((player) => {
            const age = calculateAge(player.dob);
            switch (category) {
                case "U10":
                    return age < 10;
                case "U12":
                    return age < 12;
                case "U14":
                    return age < 14;
                case "U17":
                    return age >= 14 && age <= 17;
                case "U19":
                    return age >= 14 && age <= 19;
                case "open":
                    return age >= 14;
                default:
                    return true;
            }
        });
    };

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


    return (
        <div>
            <div className="mt-8 bg-white text-black shadow-[0_20px_20px_rgba(0,0,0,0.25)] rounded-lg overflow-hidden">
                <div className="p-4 border-b bg-gray-200">
                    <h2 className="text-lg font-semibold">Player List</h2>
                    <div className="flex justify-between mt-4">
                        <select
                            name="Event"
                            value={event}
                            onChange={(e) => setEvent(e.target.value)}
                            className="px-3 py-2 border rounded-lg focus:outline-none"
                        >
                            <option value="all">All players</option>
                            <option value="Epee">Epee</option>
                            <option value="Foil">Foil</option>
                            <option value="Sabre">Sabre</option>
                        </select>

                        <select
                            name="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-3 py-2 border rounded-lg focus:outline-none"
                        >
                            <option value="all">Category</option>
                            <option value="U10">U10</option>
                            <option value="U12">U12</option>
                            <option value="U14">U14</option>
                            <option value="U17">U17</option>
                            <option value="U19">U19</option>
                            <option value="open">Open</option>
                        </select>
                    </div>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4">Player ID</th>
                            <th className="p-4">Full Name</th>
                            <th className="p-4">Event</th>
                            <th className="p-4">Date of Birth</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPlayers().length > 0 ? (
                            sortedPlayers().map((player) => (
                                <tr key={player.pid} className="border-t">
                                    <td className="p-4">SFA {player.pid}</td>
                                    <td className="p-4">{player.fullName}</td>
                                    <td className="p-4">{player.eventName}</td>
                                    <td className="p-4">{player.dob}</td>
                                    <td className="p-4">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Edit Profile
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">
                                    No players found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default PlayerList
