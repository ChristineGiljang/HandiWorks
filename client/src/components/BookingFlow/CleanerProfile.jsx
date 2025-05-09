import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Button from "../ui/Button";
import BookingForm from "./BookingForm";
import StarRating from "../cards/StarRating";
import Layout from "../navbar/Layout";

export default function CleanerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const tabs = [
    { label: "About", value: "about" },
    { label: "Photos", value: "photos" },
    { label: "Reviews & Ratings", value: "reviews" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setCurrentUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const docRef = doc(db, "services", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setService({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such cleaner!");
        }
      } catch (error) {
        console.error("Error fetching cleaner profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const toggleBookingForm = () => {
    setShowBookingForm(!showBookingForm);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading profile...</div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-20 text-gray-500">
        Cleaner not found.{" "}
        <button
          className="text-blue-500 underline"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    );
  }

  // Destructure the service object based on your data structure
  const { businessInfo, personalInfo, pricingInfo, rating, tags } = service;

  // Scroll to section when tab is clicked
  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Main Content Area */}
            <div className="flex-1 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img
                    src={
                      businessInfo?.businessPhotoURL ||
                      "/default-business-photo.jpg"
                    }
                    alt={businessInfo?.businessName || "Business"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-business-photo.jpg";
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">
                    {businessInfo?.businessName}
                  </h1>
                  <div className="text-sm text-gray-500 mb-1">
                    {personalInfo?.city}, {personalInfo?.region}
                  </div>
                  <StarRating rating={rating || 0} />
                </div>
              </div>

              {/* Tabs - Now act as navigation */}
              <div className="mt-4 sticky top-0 bg-white z-10 pt-2">
                <div className="flex gap-6 border-b">
                  {tabs.map((tab) => (
                    <button
                      key={tab.value}
                      className={`pb-2 border-b-2 transition-all duration-200 ${
                        activeTab === tab.value
                          ? "border-green-500 text-green-600 font-medium"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => scrollToSection(tab.value)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div id="about" className="pt-4 mt-4 space-y-4">
                <h2 className="text-xl font-semibold">About</h2>
                <p className="text-gray-700 text-base leading-relaxed">
                  {businessInfo?.description || "No description provided."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium text-gray-800">
                      Years of Service:{" "}
                    </span>
                    {businessInfo?.yearsOfService || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">
                      Team Size:{" "}
                    </span>
                    {businessInfo?.numCleaners
                      ? `${businessInfo.numCleaners} cleaner(s)`
                      : "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Hired: </span>0
                    times
                  </div>
                </div>
              </div>

              {/* Photos Section */}
              <div id="photos" className="pt-6 mt-8">
                <h2 className="text-xl font-semibold mb-3">Work Portfolio</h2>
                {businessInfo?.workPhotoURLs?.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {businessInfo.workPhotoURLs.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`Work photo ${idx + 1}`}
                        className="rounded-lg object-cover w-full h-32 sm:h-40"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No work photos available.</div>
                )}
              </div>

              {/* Reviews Section */}
              <div id="reviews" className="pt-6 mt-8">
                <h2 className="text-xl font-semibold mb-3">
                  Reviews & Ratings
                </h2>
                <div className="py-4">
                  <div className="text-gray-500 italic">No reviews yet.</div>
                </div>
              </div>

              {/* Tags */}
              <hr className="border-t border-gray-200 my-4" />
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-gray-100 rounded-full text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Services Offered */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Services Offered</h2>
                {pricingInfo?.mainServices?.length > 0 ? (
                  <ul className="space-y-2">
                    {pricingInfo.mainServices.map((service, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between p-2 border-b border-gray-100"
                      >
                        <span>
                          {service.serviceName || `Service ${idx + 1}`}
                        </span>
                        <span className="font-medium">
                          ₱{service.price || 0}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-500 text-sm">
                    No services listed.
                  </div>
                )}
              </div>

              {/* Add-ons */}
              {pricingInfo?.addOns?.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Add-ons</h2>
                  <ul className="space-y-2">
                    {pricingInfo.addOns.map((addon, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between p-2 border-b border-gray-100"
                      >
                        <span>{addon.addonName || `Add-on ${idx + 1}`}</span>
                        <span className="font-medium">₱{addon.price || 0}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Booking Form Area */}
            <div className="mt-8 md:mt-0 md:w-96">
              {currentUserId ? (
                <>
                  {isMobile ? (
                    <>
                      <Button
                        onClick={toggleBookingForm}
                        text={
                          showBookingForm ? "Hide Booking Form" : "Book Now"
                        }
                        variant="filledStyles"
                        className="w-full"
                      />
                      {showBookingForm && (
                        <div className="mt-4 p-4 border border-gray-200 rounded shadow-sm">
                          <BookingForm
                            serviceId={service.id}
                            clientId={currentUserId}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4 border border-gray-200 rounded shadow-sm sticky top-20">
                      <BookingForm
                        serviceId={service.id}
                        clientId={currentUserId}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-4 border border-gray-200 rounded shadow-sm">
                  <p className="text-red-500 mb-2">
                    Please log in to book this service.
                  </p>
                  <Button
                    onClick={() => navigate("/login")}
                    text="Login"
                    variant="filledStyles"
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
