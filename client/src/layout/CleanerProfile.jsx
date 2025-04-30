import StarRating from "./StarRating";
import Button from "../ui/Button";

export default function CleanerProfile({ cleaner }) {
  const {
    personalInfo,
    businessInfo,
    rating,
    hires = 0,
    pricingInfo,
    about,
    isAvailable,
  } = cleaner || {};

  const generalPrice = pricingInfo?.mainServices?.[0]?.price
    ? `₱${pricingInfo.mainServices[0].price}`
    : "Not available";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-6">
        <img
          src={businessInfo?.businessPhoto || "/default-business-photo.jpg"}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">
            {businessInfo?.businessName}
          </h2>
          <div className="flex items-center gap-2">
            <StarRating rating={rating || 0} />
            <span className="text-gray-500 text-sm">{hires} hires</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {personalInfo?.city}, {personalInfo?.streetAddress}
          </div>
          <div className="flex items-center gap-1 text-sm mt-1">
            <span
              className={`h-2 w-2 rounded-full ${
                isAvailable ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <span className="text-gray-500">
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div>
        <h3 className="font-semibold text-lg mb-2">About</h3>
        <p className="text-gray-700 text-sm">
          {about || "No description provided."}
        </p>
      </div>

      {/* Services Section */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Main Services</h3>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          {pricingInfo?.mainServices?.map((service, idx) => (
            <li key={idx}>
              {service.name} —{" "}
              <span className="font-semibold">₱{service.price}</span>
            </li>
          )) || <li>No services listed.</li>}
        </ul>
      </div>

      {/* Add-ons */}
      {pricingInfo?.addOns?.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-2">Add-ons</h3>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {pricingInfo.addOns.map((addon, idx) => (
              <li key={idx}>
                {addon.name} —{" "}
                <span className="font-semibold">₱{addon.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex gap-4">
        <Button
          text="Message"
          variant="outline"
          onClick={() => console.log("Chat")}
        />
        <Button
          text="Book Now"
          variant="filledStyles"
          onClick={() => console.log("Book")}
        />
      </div>
    </div>
  );
}
