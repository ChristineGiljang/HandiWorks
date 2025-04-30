import React from "react";

const PersonalInformationForm = ({ personalInfo, setPersonalInfo }) => {
  console.log(typeof setPersonalInfo);

  console.log(personalInfo); // Log the personal info object
  console.log(setPersonalInfo);
  // Handle the change of each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Optional: Add form validation (e.g., ensuring email is valid)
  const isFormValid = () => {
    return Object.values(personalInfo).every((field) => field !== "");
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">
        Personal Information
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        This information will be used to contact you.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-900"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              value={personalInfo.firstName || ""}
              onChange={handleChange}
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              name="lastName"
              value={personalInfo.lastName || ""}
              onChange={handleChange}
              type="text"
              autoComplete="family-name"
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={personalInfo.email || ""}
              onChange={handleChange}
              autoComplete="email"
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-900"
          >
            Phone number
          </label>
          <div className="mt-2">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={personalInfo.phone || ""}
              onChange={handleChange}
              autoComplete="tel"
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="streetAddress"
            className="block text-sm font-medium text-gray-900"
          >
            Street address
          </label>
          <div className="mt-2">
            <input
              id="streetAddress"
              name="streetAddress"
              type="text"
              value={personalInfo.streetAddress || ""}
              onChange={handleChange}
              autoComplete="street-address"
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-900"
          >
            City / Municipality
          </label>
          <div className="mt-2">
            <input
              id="city"
              name="city"
              type="text"
              value={personalInfo.city || ""}
              onChange={handleChange}
              autoComplete="address-level2"
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-900"
          >
            State / Province
          </label>
          <div className="mt-2">
            <input
              id="region"
              name="region"
              value={personalInfo.region || ""}
              onChange={handleChange}
              type="text"
              autoComplete="address-level1"
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-900"
          >
            ZIP / Postal code
          </label>
          <div className="mt-2">
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={personalInfo.postalCode || ""}
              onChange={handleChange}
              autoComplete="postal-code"
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Optional: Display a message when the form is valid */}
      {isFormValid() && (
        <p className="mt-4 text-sm text-green-600">Form is ready to submit!</p>
      )}
    </div>
  );
};

export default PersonalInformationForm;
