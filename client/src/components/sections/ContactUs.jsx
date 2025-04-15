import React from "react";

const ContactUs = () => {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 py-24">
      <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
      <p className="text-center text-gray-600 mb-12">
        Have questions or need help? Send us a message and we'll get back to you
        shortly.
      </p>
      <form className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black-500"
            placeholder="How can we help you?"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 w-full sm:w-auto mx-auto"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
