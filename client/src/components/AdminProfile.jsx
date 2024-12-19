import React from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import Tournaments from "./Tournaments.jsx";
import ParticipationCertificate from "./ParticipationCertificate.jsx";
import MeritCertificate from "./MeritCertificate.jsx";

const AdminProfile = () => {
  return (
    <div className="w-full min-h-screen bg-blue-600 pt-24 flex gap-5 justify-center items-center">
      
        <div className="w-[40%] bg-white rounded-lg text-lg flex gap-3 flex-col font-bold p-3">
          <Link to="adminProfile/tournaments">Tournaments</Link>
          <Link to="adminProfile/participationCertificate">
            Add Participation Certificate
          </Link>
          <Link to="adminProfile/meritCertificate">Add Merit Certificate</Link>
        </div>
        
          <Outlet />
        


      <Routes>
        <Route path="adminProfile/tournaments" element={<Tournaments />} />
        <Route
          path="adminProfile/participationCertificate"
          element={<ParticipationCertificate />}
        />
        <Route
          path="adminProfile/meritCertificate"
          element={<MeritCertificate />}
        />
      </Routes>
    </div>
  );
};

export default AdminProfile;
