import React, { useState } from "react";
import SearchBar from "../ui/SearchBar";

const HeroSection = () => {
  return (
    <section className=" h-screen flex items-center justify-center text-center">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find the Right Service, Right Near You
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Browse through a wide range of trusted service providers in your area
          - we make it easy to connect with local experts to get the job done.
        </p>

        <SearchBar />
      </div>
    </section>
  );
};

export default HeroSection;
