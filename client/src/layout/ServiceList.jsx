import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../auth/firebase";
import ServiceCardSkeleton from "../components/skeletons/ServiceCardSkeleton";
import ServiceCard from "../components/cards/ServiceCard";
import { useNavigate } from "react-router-dom";

export default function ServiceList({ userAddress }) {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const address =
      userAddress || JSON.parse(localStorage.getItem("userAddress"));

    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const allServices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let filteredServices = allServices;

        if (address?.city || address?.streetAddress) {
          filteredServices = allServices.filter((service) => {
            const serviceCity =
              service.personalInfo?.city?.trim().toLowerCase() || "";
            const serviceStreet =
              service.personalInfo?.streetAddress?.trim().toLowerCase() || "";

            const inputCity = address.city?.trim().toLowerCase() || "";
            const inputStreet =
              address.streetAddress?.trim().toLowerCase() || "";

            const cityMatch = serviceCity.includes(inputCity);
            const streetMatch = serviceStreet.includes(inputStreet);

            return cityMatch && streetMatch;
          });
        }

        setServices(filteredServices);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [userAddress]);

  const handleBookService = (serviceId) => {
    // Implement booking logic or navigation
    console.log("Booking service:", serviceId);
    // navigate(`/book/${serviceId}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <ServiceCardSkeleton key={idx} />
          ))
        ) : services.length > 0 ? (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              businessName={service.businessInfo?.businessName}
              businessPhoto={service.businessInfo?.businessPhotoURL} // Use businessPhotoURL instead of businessPhoto
              title={service.businessInfo?.businessName || "Cleaning Service"}
              rating={service.rating || 0}
              tags={service.tags || ["Cleaning"]}
              isAvailable={service.isAvailable !== false} // Default to true if not specified
              pricingInfo={service.pricingInfo}
              personalInfo={service.personalInfo} // Pass the entire personalInfo object
              onSeeProfile={() => navigate(`/profile/${service.id}`)}
              onBook={() => handleBookService(service.id)}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">
            No cleaners found in your area.
          </div>
        )}
      </div>
    </div>
  );
}
