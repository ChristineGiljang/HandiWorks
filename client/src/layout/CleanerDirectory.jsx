import { useState } from "react";
import ServiceCard from "./ServiceCard";
import CleanerProfile from "./CleanerProfile";

export default function CleanerDirectory({ services }) {
  const [selectedCleaner, setSelectedCleaner] = useState(null);

  const handleSeeProfile = (cleanerData) => {
    setSelectedCleaner(cleanerData);
  };

  const handleBack = () => {
    setSelectedCleaner(null);
  };

  return (
    <div className="p-4">
      {selectedCleaner ? (
        <div>
          <button
            onClick={handleBack}
            className="mb-4 text-sm text-blue-600 underline"
          >
            ← Back to cleaners
          </button>
          <CleanerProfile cleaner={selectedCleaner} />
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              onChat={() => handleSeeProfile(service)}
              onBook={() => console.log("Book", service)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
