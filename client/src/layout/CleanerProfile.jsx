import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import Button from "../components/ui/Button";
import StarRating from "../components/cards/StarRating";

export default function CleanerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={businessInfo?.businessPhoto || "/default-business-photo.jpg"}
          alt="Business"
          className="w-24 h-24 rounded-full object-cover shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-1">
            {businessInfo?.businessName}
          </h1>
          <p className="text-gray-600 text-sm mb-2">
            {personalInfo?.streetAddress}, {personalInfo?.city}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={rating || 0} />
            <span className="text-xs text-gray-500">({rating || 0})</span>
          </div>
        </div>
      </div>

      {/* 🔽 Line spans the full width below the whole header section */}
      <hr className="border-t border-gray-200 my-4" />

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

      <div className="flex gap-4">
        <Button text="Back" variant="outline" onClick={() => navigate(-1)} />
        <Button
          text="Book Now"
          variant="filledStyles"
          onClick={() => alert("Booking...")}
        />
      </div>
    </div>
  );
}
