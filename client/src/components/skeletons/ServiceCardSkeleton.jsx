import StarRating from "../cards/StarRating";
import Button from "../ui/Button";

export default function ServiceCard({
  image,
  title,
  rating,
  tags = [],
  price,
  isAvailable,
  onBook,
  onChat,
}) {
  return (
    <div className="max-w-screen-xl mx-auto p-4 bg-white rounded-2xl shadow-sm border hover:shadow-md hover:scale-[1.01] cursor-pointer transition-all duration-200">
      <div className="flex items-center justify-between w-full">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt="profile"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-lg">{title}</h3>

            {/* Stars */}
            <StarRating rating={rating} />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
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
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end gap-2">
          {price && (
            <div className="text-sm font-medium text-gray-700">{price}</div>
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

          <div className="flex gap-2">
            <Button
              onClick={onChat}
              text="Chat"
              variant="outline"
              className="mr-0"
            />
            <Button
              onClick={onBook}
              text="Book Now"
              variant="filledStyles"
              className="mr-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
