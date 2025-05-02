import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import Button from "../ui/Button";
import BookingForm from "./BookingForm";
import StarRating from "../cards/StarRating";

export default function CleanerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const tabs = [
    { label: "About", value: "about" },
    { label: "Photos", value: "photos" },
    { label: "Reviews & Ratings", value: "reviews" },
  ];

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

  const { businessInfo, personalInfo, pricingInfo, rating, tags, isAvailable } =
    service;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={businessInfo?.businessPhoto || "/default-business-photo.jpg"}
            alt="Business"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold">
              {businessInfo?.businessName}
            </h1>
            <div className="text-sm text-gray-500 mb-1">
              {personalInfo?.city}, {personalInfo?.streetAddress}
            </div>
            <StarRating rating={rating || 0} />
          </div>
        </div>
        <BookingForm serviceId={service.id} clientId={currentUserId} />
        <Button
          text="Book Now"
          variant="filledStyles"
          className="w-full sm:w-auto"
          onClick={() => alert("Booking...")}
        />
      </div>
      <div className="mt-6">
        <div className="flex gap-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`pb-2 border-b-2 transition-all duration-200 ${
                activeTab === tab.value
                  ? "border-green-500 text-green-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Business Description & Details */}
      <div className="space-y-4">
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
            <span className="font-medium text-gray-800">Team Size: </span>
            {businessInfo?.numCleaners
              ? `${businessInfo.numCleaners} cleaner(s)`
              : "N/A"}
          </div>
          <div>
            <span className="font-medium text-gray-800">Hired: </span>0 times
          </div>
        </div>

        {/* Work Photos */}
        {businessInfo?.workPhotos?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mt-6 mb-2">Work Photos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {businessInfo.workPhotos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Work photo ${idx + 1}`}
                  className="rounded-lg object-cover w-full h-32 sm:h-40"
                />
              ))}
            </div>
          </div>
        )}
      </div>
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

      <div>
        <h2 className="text-xl font-semibold mb-2">Services Offered</h2>
        {pricingInfo?.mainServices?.length ? (
          <ul className="space-y-2">
            {pricingInfo.mainServices.map((service, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{service.name}</span>
                <span className="font-medium">₱{service.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-sm">No services listed.</div>
        )}
      </div>
    </div>
  );
}
