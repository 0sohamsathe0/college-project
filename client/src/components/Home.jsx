import React from "react";
import "../App.css";
import Club from "./Club.jsx";
import FencerDesign from "../assets/FencerDesign.png";
import DisplayChampionsResults from "./DisplayChampionsResults.jsx";
import DisplayLatestTournaments from "./DisplayLatestTournaments.jsx";
import DisplayTeamResults from "./DisplayTeamResults.jsx";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="heroSection mb-10 flex justify-center items-center"></div>

      <Club />

      {/* About Section */}
      <section className="px-4 sm:px-8 lg:px-12">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-[#0e0e51] mt-10 font-extrabold underline underline-offset-4">
          WHO WE ARE
        </h2>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#0e0e51] mt-2 font-extrabold underline underline-offset-4">
          A Legacy of Excellence
        </h1>

        <div className="aboutSection mt-6 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 bg-gray-100 rounded-2xl shadow-md">
          {/* About Text */}
          <div className="lg:w-1/2 text-[#0e0e51]">
            <p className="text-justify leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum ad voluptas, est saepe optio in
              minima voluptatum fuga fugiat nisi quisquam aut ea laborum soluta sed id accusamus, dicta quam
              distinctio quos a hic quaerat officia.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-6 font-bold">
              {[
                { label: "Players in Academy", count: "100+" },
                { label: "International Players", count: "10+" },
                { label: "National Players", count: "30+" },
                { label: "State Players", count: "50+" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center px-6 py-4 bg-blue-gray-100 rounded-xl shadow-md"
                >
                  <h1 className="text-xl sm:text-2xl">{item.count}</h1>
                  <p className="text-sm sm:text-base">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About Image */}
          <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-yellow-500 rounded-xl p-6">
            <img src={FencerDesign} alt="Fencer Illustration" className="w-full h-auto max-w-lg" />
          </div>
        </div>
      </section>

      {/* Results & Tournaments */}
      <section className="mt-12">
        <DisplayLatestTournaments /><br /><br />
        <DisplayChampionsResults /><br /><br />
        <DisplayTeamResults /><br /><br />
      </section>
    </>
  );
};

export default Home;
