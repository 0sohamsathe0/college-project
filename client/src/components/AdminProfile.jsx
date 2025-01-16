import React from "react";
import { Link, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Tournaments from "./Tournaments.jsx";
import ParticipationCertificate from "./ParticipationCertificate.jsx";
import MeritCertificate from "./MeritCertificate.jsx";
import PlayerRequestQueue from "./PlayerRequestQueue.jsx";

const AdminProfile = () => {
  return (
    <div className="flex flex-row gap-5 min-h-screen bg-blue-600 pt-24">
      {/* Left Side (Links) */}
      <div className="w-2/5 h-full bg-white rounded-lg text-lg font-bold p-4 flex flex-col gap-3">
        <Link to="playerRequests">Player Requests</Link>
        <Link to="tournaments">Tournaments</Link>
        <Link to="participationCertificate">Add Participation Certificate</Link>
        <Link to="meritCertificate">Add Merit Certificate</Link>
      </div>

      {/* Right Side (Content) */}
      <div className="w-3/5">
        <Routes>
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="playerRequests" replace />} />

          {/* Child Routes */}
          <Route path="playerRequests" element={<PlayerRequestQueue />} />
          <Route path="tournaments" element={<Tournaments />} />
          <Route
            path="participationCertificate"
            element={<ParticipationCertificate />}
          />
          <Route path="meritCertificate" element={<MeritCertificate />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminProfile;
