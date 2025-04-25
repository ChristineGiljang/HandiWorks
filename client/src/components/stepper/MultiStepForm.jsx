import React, { useState } from "react";
import StepProgress from "./StepProgress";
import PersonalInformationForm from "./PersonalInformation";
import NavBarLogo from "../navbar/NavBarLogo";
import Button from "../ui/Button";
import ServiceForm from "./ServiceForm";
import PricingForm from "./PricingForm";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      <NavBarLogo />
      <div className="p-6 max-w-4xl mx-auto">
        <StepProgress currentStep={step} />

        <div className="mt-8">
          {step === 1 && <PersonalInformationForm />}
          {step === 2 && <ServiceForm />}
          {step === 3 && <PricingForm />}
        </div>

        <div className="flex justify-between mt-10">
          {step > 1 && (
            <Button
              text="Back"
              onClick={() => setStep((prev) => prev - 1)}
              variant="filledStyles"
            />
          )}
          {step < 4 && (
            <Button
              onClick={() => setStep((prev) => prev + 1)}
              text="Next"
              variant="filledStyles"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;
