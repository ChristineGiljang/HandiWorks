import React, { useState } from "react";
import StepProgress from "./StepProgress";
import PersonalInformationForm from "./PersonalInformation";
import NavBarLogo from "../navbar/NavBarLogo";
import Button from "../ui/Button";
import ServiceForm from "./ServiceForm";
import PricingForm from "./PricingForm";
import ReviewSection from "./ReviewSection";
import axios from "axios"; // Import axios
import { db, auth } from "../../auth/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    numCleaners: "",
    yearsOfService: "",
    businessPhoto: null,
    workPhotos: [],
  });

  const [pricingData, setPricingData] = useState({
    mainServices: [],
    addOns: [],
  });

  const handleSavePricing = (pricing) => {
    setPricingData(pricing);
  };

  // Helper function to upload files to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my-upload-preset"); // Replace with your upload preset
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME); // Cloud name from .env (using import.meta.env)

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      return response.data.secure_url; // This is the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image to Cloudinary.");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("User not authenticated. Please log in again.");
        return;
      }

      // Upload business photo
      let businessPhotoURL = null;
      if (formData.businessPhoto) {
        businessPhotoURL = await uploadToCloudinary(formData.businessPhoto);
      }

      // Upload work photos
      let workPhotoURLs = [];
      if (formData.workPhotos.length > 0) {
        workPhotoURLs = await Promise.all(
          formData.workPhotos.map((photo) => uploadToCloudinary(photo))
        );
      }

      // Prepare the full form data
      const formToSubmit = {
        userId: currentUser.uid, // ✅ Attach the user's UID here
        personalInfo,
        businessInfo: {
          ...formData,
          businessPhoto: businessPhotoURL,
          workPhotos: workPhotoURLs,
        },
        pricingInfo: pricingData,
        createdAt: new Date(),
      };

      // Submit to Firestore
      await addDoc(collection(db, "services"), formToSubmit);

      navigate("/pro/dashboard");

      // Reset everything
      setPersonalInfo({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: "",
        city: "",
        region: "",
        postalCode: "",
      });
      setFormData({
        businessName: "",
        description: "",
        numCleaners: "",
        yearsOfService: "",
        businessPhoto: null,
        workPhotos: [],
      });
      setPricingData({
        mainServices: [],
        addOns: [],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };
  return (
    <>
      <NavBarLogo />
      <div className="p-6 max-w-4xl mx-auto">
        <StepProgress currentStep={step} />

        <div className="mt-8">
          {step === 1 && (
            <PersonalInformationForm
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
            />
          )}
          {step === 2 && (
            <ServiceForm formData={formData} setFormData={setFormData} />
          )}
          {step === 3 && (
            <PricingForm
              initialMainServices={pricingData.mainServices}
              initialAddOns={pricingData.addOns}
              onSave={handleSavePricing}
            />
          )}
          {step === 4 && (
            <ReviewSection
              personalInfo={personalInfo}
              businessInfo={formData}
              mainServices={pricingData.mainServices}
              addOns={pricingData.addOns}
            />
          )}
        </div>

        <div className="flex justify-between mt-10">
          {step > 1 && (
            <Button
              text="Back"
              onClick={() => setStep((prev) => prev - 1)}
              variant="filledStyles"
            />
          )}
          {step < 4 ? (
            <Button
              text="Next"
              onClick={() => setStep((prev) => prev + 1)}
              variant="filledStyles"
            />
          ) : (
            <Button
              text="Submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              variant="filledStyles"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;
