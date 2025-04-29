import React, { useState } from "react";
import AddressModal from "../booking/AddressModal";
import ServiceList from "../../layout/ServiceList";

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [userAddress, setUserAddress] = useState(null);

  const handleAddressSubmit = (address) => {
    setUserAddress(address);
    setShowModal(false); // close modal after submission
    console.log("📍 Address captured:", address);
  };

  return (
    <>
      <section id="hero" className="h-screen flex justify-center items-center">
        <div className="absolute inset-0 bg-white opacity-5"></div>

        <div className="relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            Book Trusted Cleaners in Cebu – Instantly.
          </h1>
          <p className="text-lg text-black mb-8">
            HandiWorks connects you with local professionals you can trust —
            with just 1 click.
          </p>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
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

      <AddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddressSubmit}
      />

      {userAddress && <ServiceList userAddress={userAddress} />}
    </>
  );
};

export default HeroSection;
