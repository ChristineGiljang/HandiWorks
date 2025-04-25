import React, { useState } from "react";
import PersonalInformationForm from "./PersonalInformationForm";
import PricingForm from "./PricingForm";
import ServiceForm from "./ServiceForm";
import ReviewSection from "./ReviewSection";

const CleanerRegistration = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
  });

  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    businessPhoto: null,
    workPhotos: [],
  });

  const [mainServices, setMainServices] = useState([]);
  const [addOns, setAddOns] = useState([]);

  return (
    <div className="space-y-12 p-6 max-w-4xl mx-auto bg-white rounded-lg">
      <PersonalInformationForm
        personalInfo={personalInfo}
        setPersonalInfo={setPersonalInfo}
      />
      <ServiceForm
        businessInfo={businessInfo}
        setBusinessInfo={setBusinessInfo}
      />
      <PricingForm
        mainServices={mainServices}
        setMainServices={setMainServices}
        addOns={addOns}
        setAddOns={setAddOns}
      />
      <ReviewSection
        personalInfo={personalInfo}
        businessInfo={businessInfo}
        mainServices={mainServices}
        addOns={addOns}
      />
    </div>
  );
};

export default CleanerRegistration;
