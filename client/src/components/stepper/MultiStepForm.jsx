import React, { useState } from "react";
import StepProgress from "./StepProgress";
import PersonalInformationForm from "./PersonalInformation";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <StepProgress currentStep={step} />

      <div className="mt-8">
        {step === 1 && <PersonalInformationForm />}
        {step === 2 && <div>Step 2 Content: Account Info</div>}
        {step === 3 && <div>Step 3 Content: Confirmation</div>}
      </div>

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
