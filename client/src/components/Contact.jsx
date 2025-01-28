import React from 'react'

const Contact = () => {
    return (
        <>
             <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center py-10">
        <h2 className="text-3xl font-bold text-blue-800">Join All Star Fencing Club</h2>
        <p className="text-gray-600 mt-4">Fill out the form below to join us and start your fencing journey!</p>
      </header>
      <section className="max-w-2xl mx-auto mt-6">
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tell us why you want to join"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Submit</button>
        </form>
      </section>
    </div>
        </>
    )
}

export default Contact
