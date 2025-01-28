import React from 'react'
import ClubImg from "../assets/ClubImg.jpg"

const Aboutus = () => {
    return (
        <>
        
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center py-10">
        <h2 className="text-4xl font-bold text-blue-800">About Us</h2>
        <p className="text-gray-600 mt-4">Learn more about our history, vision, and mission.</p>
      </header>
      <section className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={ClubImg} alt="Fencing Action" className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="space-y-4">
          <p className="text-gray-700 text-lg leading-relaxed">
            All Star Fencing Club was established with the vision of promoting the sport of fencing among enthusiasts of all ages. Our experienced coaches and state-of-the-art facilities provide an ideal environment to learn and excel in this elegant and competitive sport. We believe in fostering discipline, strategy, and sportsmanship in all our members.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our club offers programs for beginners, intermediate, and advanced fencers, ensuring that everyone can find their place and progress at their own pace. With regular tournaments, workshops, and community events, we strive to create a vibrant and inclusive community of fencing enthusiasts.
          </p>
         
        </div>
      </section>
      <section className="max-w-5xl mx-auto mt-8">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">What Makes Us Special</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li className="text-gray-700">Expert coaching staff with decades of experience.</li>
          <li className="text-gray-700">State-of-the-art training facilities and equipment.</li>
          <li className="text-gray-700">Opportunities to participate in regional and national tournaments.</li>
          <li className="text-gray-700">Strong emphasis on values like discipline and camaraderie.</li>
          <li className="text-gray-700">Community outreach programs to inspire future fencers.</li>
        </ul>
      </section>
    </div>
        </>
    )
}

export default Aboutus
