import React from "react";
import Button from "../ui/Button";
import StarRating from "./StarRating";
import { MapPinIcon } from "lucide-react";

export default function ServiceCard({
  image,
  title,
  rating,
  tags = [],
  pricingInfo,
  isAvailable,
  onBook,
  onSeeProfile,
  businessName,
  businessPhoto, // This should now match businessPhotoURL from your data
  personalInfo, // Changed from location to personalInfo to match your data structure
}) {
  // Get price from pricingInfo
  const generalPrice = pricingInfo?.mainServices?.[0]?.price
    ? `₱${pricingInfo.mainServices[0].price}`
    : null;

  // Format location from personalInfo
  const formattedLocation = personalInfo
    ? `${personalInfo.city || ""}, ${personalInfo.region || ""}`
    : "Location not specified";

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full p-4 bg-white rounded-2xl shadow-sm border hover:shadow-md hover:scale-[1.01] cursor-pointer transition-all duration-200">
      {/* Left side */}
      <div className="flex items-center sm:flex-row sm:items-start justify-between gap-4 w-full sm:w-auto">
        {/* Business Photo */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
          {businessPhoto ? (
            <img
              src={businessPhoto}
              alt={businessName || "Business"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-business-photo.jpg";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              <span className="text-xs">No Photo</span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1">
          {/* Title and Business Name */}
          <h3 className="font-semibold text-base sm:text-lg text-left">
            {title}
          </h3>
          <div className="text-sm font-medium text-gray-600">
            {businessName}
          </div>

          {/* Location with icon */}
          <div className="flex items-center text-gray-500 text-xs mt-1">
            <MapPinIcon size={12} className="mr-1" />
            <span>{formattedLocation}</span>
          </div>

          {/* Rating */}
          <div className="flex justify-start mt-1">
            <StarRating rating={rating} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-1 justify-start">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile Price */}
        <div className="flex flex-col items-end text-right sm:hidden text-sm">
          {generalPrice && (
            <div className="text-lg font-bold font-medium text-gray-700">
              {generalPrice}
            </div>
          )}
          <div className="flex items-center gap-1">
            <span
              className={`h-2 w-2 rounded-full ${
                isAvailable ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <span className="text-xs text-gray-500">
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Price */}
      <div className="flex flex-col items-center sm:items-end gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
        <div className="hidden sm:flex flex-col items-end text-right">
          {generalPrice && (
            <div className="text-lg font-bold font-medium text-gray-700">
              {generalPrice}
            </div>
          )}
          <div className="flex items-center gap-1">
            <span
              className={`h-2 w-2 rounded-full ${
                isAvailable ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <span className="text-xs text-gray-500">
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={() =>
              onSeeProfile({
                businessName,
                businessPhoto,
                title,
                pricingInfo,
                tags,
                rating,
                personalInfo, // Pass personalInfo to profile view instead of location
              })
            }
            text="See profile"
            variant="outline"
            className="flex-1 mr-0 sm:flex-none"
          />
          <Button
            onClick={onBook}
            text="Book Now"
            variant="filledStyles"
            className="flex-1 mr-0 sm:flex-none"
            disabled={!isAvailable}
          />
        </div>
      </div>
    </div>
  );
}
