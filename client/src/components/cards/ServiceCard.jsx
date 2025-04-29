import Button from "../ui/Button";
import StarRating from "./StarRating";

export default function ServiceCard({
  image,
  title,
  rating,
  tags = [],
  price,
  isAvailable,
  onBook,
  onChat,
  businessName,
  businessPhoto,
}) {
  console.log("businessName:", businessName);
  console.log("businessPhoto:", businessPhoto);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full p-4 bg-white rounded-2xl shadow-sm border hover:shadow-md hover:scale-[1.01] cursor-pointer transition-all duration-200">
      {/* Left side */}
      <div className="flex items-center sm:items-start justify-between gap-4 w-full sm:w-auto">
        {/* Business Photo */}
        <img
          src={businessPhoto || "/default-business-photo.jpg"}
          alt="business"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
        />

        {/* Title, Business Name, Rating, Tags */}
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold text-base sm:text-lg text-left">
            {title}
          </h3>

          {/* Business Name */}
          <div className="text-sm font-medium text-gray-600">
            {businessName}
          </div>

          <div className="flex justify-start">
            <StarRating rating={rating} />
          </div>

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

        {/* Price & Availability - Mobile Only */}
        <div className="flex flex-col items-end text-right sm:hidden text-sm">
          {price && <div className="text-lg font-bold">{price}</div>}
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

      {/* Right side - Desktop */}
      <div className="flex flex-col items-center sm:items-end gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
        {/* Price & Availability - Desktop Only */}
        <div className="hidden sm:flex flex-col items-end text-right">
          {price && (
            <div className="text-lg font-bold font-medium text-gray-700">
              {price}
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

        {/* Buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={onChat}
            text="Chat"
            variant="outline"
            className="flex-1 mr-0 sm:flex-none"
          />
          <Button
            onClick={onBook}
            text="Book Now"
            variant="filledStyles"
            className="flex-1 mr-0 sm:flex-none"
          />
        </div>
      </div>
    </div>
  );
}
