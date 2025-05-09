import React from "react";

const StepProgress = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Service Info" },
    { number: 3, label: "Pricing Info" },
    { number: 4, label: "Confirmation" },
  ];

  return (
    <>
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          const commonClass = `flex items-center ${
            index < steps.length - 1
              ? "md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              : ""
          }`;

          const textClass = `${
            isCompleted || isActive ? "text-green-600 dark:text-green-500" : ""
          }`;

          return (
            <li key={step.number} className={`${commonClass} ${textClass}`}>
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                {isCompleted ? (
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                ) : (
                  <span className="me-2">{step.number}</span>
                )}
                {step.label.split(" ")[0]}{" "}
                <span className="hidden sm:inline-flex sm:ms-2">
                  {step.label.split(" ")[1]}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      {/* Horizontal line below progress bar */}
      <hr className="mt-6  border-gray-300" />
    </>
  );
};

export default StepProgress;
