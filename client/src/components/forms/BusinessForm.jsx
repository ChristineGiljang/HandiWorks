import React, { useState } from "react";
import StepProgress from "./StepProgress"; // Import the StepProgress component

export default function BusinessForm() {
  const [currentStep, setCurrentStep] = useState(1); // Manage form steps

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Progress Bar */}
      <StepProgress currentStep={currentStep} />

      {/* Business Form Sections */}
      <div className="mt-6">
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-semibold">Step 1: Personal Info</h2>
            {/* Add your fields here for personal info */}
            <input
              type="text"
              placeholder="Business Name"
              className="w-full p-2 mt-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Business Type"
              className="w-full p-2 mt-4 border rounded-lg"
            />
            <button
              onClick={handleNext}
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-semibold">Step 2: Account Info</h2>
            {/* Add your fields here for account info */}
            <textarea
              placeholder="Description"
              className="w-full p-2 mt-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-2 mt-4 border rounded-lg"
            />
            <button
              onClick={handlePrev}
              className="mt-4 p-2 bg-gray-500 text-white rounded-lg"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-semibold">Step 3: Confirmation</h2>
            {/* Add your fields here for confirmation */}
            <input
              type="text"
              placeholder="Price"
              className="w-full p-2 mt-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Business Hours"
              className="w-full p-2 mt-4 border rounded-lg"
            />
            <button
              onClick={handlePrev}
              className="mt-4 p-2 bg-gray-500 text-white rounded-lg"
            >
              Back
            </button>
            <button
              onClick={() => alert("Form submitted!")}
              className="mt-4 p-2 bg-green-500 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
