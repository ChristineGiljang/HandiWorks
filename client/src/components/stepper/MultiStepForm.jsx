import React, { useState } from "react";
import StepProgress from "./StepProgress";
import PersonalInformationForm from "./PersonalInformation";
import NavBarLogo from "../navbar/NavBarLogo";
import Button from "../ui/Button";
import ServiceForm from "./ServiceForm";
import PricingForm from "./PricingForm";
import ReviewSection from "./ReviewSection";
import axios from "axios";
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
    businessPhotoPreview: null,
    workPhotos: [],
    workPhotosPreviews: [],
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
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      return response.data.secure_url;
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
        setIsSubmitting(false);
        return;
      }

      // Upload business photo
      let businessPhotoURL = null;
      if (formData.businessPhoto) {
        businessPhotoURL = await uploadToCloudinary(formData.businessPhoto);
      }

      // Upload work photos
      let workPhotoURLs = [];
      if (formData.workPhotos && formData.workPhotos.length > 0) {
        workPhotoURLs = await Promise.all(
          formData.workPhotos.map((photo) => uploadToCloudinary(photo))
        );
        // Filter out any null values in case some uploads failed
        workPhotoURLs = workPhotoURLs.filter((url) => url !== null);
      }

      // Create a clean version of the business info without File objects
      // Firestore cannot store File objects or functions
      const cleanBusinessInfo = {
        businessName: formData.businessName || "",
        description: formData.description || "",
        numCleaners: formData.numCleaners || "",
        yearsOfService: formData.yearsOfService || "",
        businessPhotoURL: businessPhotoURL,
        workPhotoURLs: workPhotoURLs,
      };

      // Clean pricing data to ensure it's Firestore compatible
      const cleanMainServices = pricingData.mainServices.map((service) => ({
        serviceName: service.serviceName || "",
        price: service.price || "",
        serviceType: service.serviceType || "",
        description: service.description || "",
      }));

      const cleanAddOns = pricingData.addOns.map((addon) => ({
        addonName: addon.addonName || "",
        price: addon.price || "",
        description: addon.description || "",
      }));

      // Prepare the full form data with clean objects
      const formToSubmit = {
        userId: currentUser.uid,
        personalInfo: {
          firstName: personalInfo.firstName || "",
          lastName: personalInfo.lastName || "",
          email: personalInfo.email || "",
          phone: personalInfo.phone || "",
          streetAddress: personalInfo.streetAddress || "",
          city: personalInfo.city || "",
          region: personalInfo.region || "",
          postalCode: personalInfo.postalCode || "",
        },
        businessInfo: cleanBusinessInfo,
        pricingInfo: {
          mainServices: cleanMainServices,
          addOns: cleanAddOns,
        },
        createdAt: new Date(),
      };

      // Submit to Firestore
      await addDoc(collection(db, "services"), formToSubmit);

      // Navigate to dashboard on success
      navigate("/pro/dashboard");

      // Reset form state
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
        businessPhotoPreview: null,
        workPhotos: [],
        workPhotosPreviews: [],
      });
      setPricingData({
        mainServices: [],
        addOns: [],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Failed to submit form: ${error.message}`);
    } finally {
      setIsSubmitting(false);
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
