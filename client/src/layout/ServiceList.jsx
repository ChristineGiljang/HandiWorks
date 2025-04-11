import { useState, useEffect } from "react";
import ServiceCardSkeleton from "../components/skeletons/ServiceCardSkeleton";
import ServiceCard from "../components/cards/ServiceCard";
import { mockServices } from "../data/mockServices";
import Navbar from "../components/navbar/NavBar";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setServices(mockServices);
      setIsLoading(false);
    }, 1500); // 1.5s loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Include Navbar here */}
      <Navbar />

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <ServiceCardSkeleton key={idx} />
              ))
            : services.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
        </div>
      </div>
    </div>
  );
}
