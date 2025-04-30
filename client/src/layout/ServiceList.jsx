import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../auth/firebase"; // your Firebase config file

import ServiceCardSkeleton from "../components/skeletons/ServiceCardSkeleton";
import ServiceCard from "../components/cards/ServiceCard";
import Navbar from "../components/navbar/NavBar";

export default function ServiceList({ userAddress }) {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const address =
      userAddress || JSON.parse(localStorage.getItem("userAddress"));

    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "services")); // Fetch from "cleaners" collection
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

            // Match the city and street partially to make it more flexible
            const cityMatch = serviceCity.includes(inputCity);
            const streetMatch = serviceStreet.includes(inputStreet);

            return cityMatch && streetMatch; // Service is included if both city and street match
          });
        }
        console.log("Filtered Services:", filteredServices);
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

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <ServiceCardSkeleton key={idx} />
            ))
          ) : services.length > 0 ? (
            services.map((service) => (
              <ServiceCard
                key={service.id} // Added key here
                businessName={service.businessInfo?.businessName}
                businessPhoto={service.businessInfo?.businessPhoto}
                image={service.businessPhoto} // assuming you want to show business photo in the service card
                title={service.businessName} // assuming business name is used as the title
                rating={service.rating || 0} // assuming there's a rating field
                tags={service.tags || []} // assuming tags is an array
                price={service.price} // assuming price is in service data
                isAvailable={service.isAvailable}
                pricingInfo={service.pricingInfo}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">
              No cleaners found in your area.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
