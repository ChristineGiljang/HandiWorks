import React from "react";
import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section id="hero" className="h-screen flex justify-center items-center ">
      {/* Optional: Add a subtle overlay if needed */}
      <div className="absolute inset-0 bg-white opacity-5"></div>

      <div className="relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-black mb-4">
          Book Trusted Cleaners in Cebu – Instantly.
        </h1>
        <p className="text-lg text-black mb-8">
          HandiWorks connects you with local professionals you can trust — with
          just 1 click.
        </p>

        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Book Now
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
