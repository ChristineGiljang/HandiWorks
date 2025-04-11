export default function StarRating({ rating }) {
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1 text-yellow-500 text-sm">
      {Array.from({ length: totalStars }).map((_, idx) => (
        <span key={idx}>{idx < rating ? "★" : "☆"}</span>
      ))}
      <span className="text-gray-500 text-xs ml-1">
        {rating}/{totalStars}
      </span>
    </div>
  );
}
