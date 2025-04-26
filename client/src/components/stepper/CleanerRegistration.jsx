import React, { useState } from "react";
import PersonalInformationForm from "./PersonalInformation";
import PricingForm from "./PricingForm";
import ServiceForm from "./ServiceForm";
import ReviewSection from "./ReviewSection";

const CleanerRegistration = () => {
  const [step, setStep] = useState(1); // To manage current step in the stepper

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    streetAddress: "123 Main St",
    city: "Cebu",
    region: "Central Visayas",
    postalCode: "6000",
  });

  const [businessInfo, setBusinessInfo] = useState({
    businessName: "John's Cleaning",
    businessPhoto: "https://via.placeholder.com/150",
    workPhotos: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  });

  const [mainServices, setMainServices] = useState([
    { name: "Basic Cleaning", price: 1000 },
    { name: "Deep Cleaning", price: 2000 },
  ]);
  const [addOns, setAddOns] = useState([
    { name: "Window Cleaning", price: 500 },
    { name: "Carpet Cleaning", price: 300 },
  ]);

  // Function to go to the next step
  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 4)); // Prevent going beyond step 4
  };

  // Function to go to the previous step
  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); // Prevent going below step 1
  };

  return (
    <div className="space-y-12 p-6 max-w-4xl mx-auto bg-white rounded-lg">
      {/* Render form based on current step */}
      {step === 1 && (
        <PersonalInformationForm
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
        />
      )}

      {step === 2 && (
        <ServiceForm
          businessInfo={businessInfo}
          setBusinessInfo={setBusinessInfo}
        />
      )}

      {step === 3 && (
        <PricingForm
          mainServices={mainServices}
          setMainServices={setMainServices}
          addOns={addOns}
          setAddOns={setAddOns}
        />
      )}

      {step === 4 && (
        <ReviewSection
          personalInfo={personalInfo}
          businessInfo={businessInfo}
          mainServices={mainServices}
          addOns={addOns}
        />
      )}

      {/* Step navigation buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md"
          >
            Previous
          </button>
        )}

        {step < 4 ? (
          <button
            onClick={nextStep}
            className="py-2 px-4 bg-indigo-600 text-white rounded-md"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => alert("Form submitted!")}
            className="py-2 px-4 bg-indigo-600 text-white rounded-md"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default CleanerRegistration;
