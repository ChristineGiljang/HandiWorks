import React from "react";
import SearchBar from "../ui/SearchBar";

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

        <SearchBar />
      </div>
    </section>
  );
};

export default HeroSection;
