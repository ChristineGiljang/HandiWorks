const ReviewSection = ({
  personalInfo,
  businessInfo,
  mainServices,
  addOns,
}) => {
  return (
    <div className="p-6 bg-gray-50 border rounded-md">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Review Information
      </h2>

      {/* Personal Info */}
      <div>
        <h3 className="font-semibold text-gray-700">Personal Information</h3>
        <ul className="text-sm text-gray-600 space-y-1 mt-1">
          <li>
            <strong>Name:</strong> {personalInfo.firstName}{" "}
            {personalInfo.lastName}
          </li>
          <li>
            <strong>Email:</strong> {personalInfo.email}
          </li>
          <li>
            <strong>Phone:</strong> {personalInfo.phone}
          </li>
          <li>
            <strong>Address:</strong> {personalInfo.streetAddress},{" "}
            {personalInfo.city}, {personalInfo.region},{" "}
            {personalInfo.postalCode}
          </li>
        </ul>
      </div>

      {/* Business Info */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700">Business Information</h3>
        <p className="text-sm text-gray-600">
          <strong>Name:</strong> {businessInfo.businessName}
        </p>
        {businessInfo.businessPhoto && (
          <img
            src={businessInfo.businessPhoto}
            alt="Business"
            className="mt-2 w-40 h-40 object-cover rounded-md"
          />
        )}
        {businessInfo.workPhotos.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {businessInfo.workPhotos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt="Work"
                className="w-24 h-24 rounded-md object-cover"
              />
            ))}
          </div>
        )}
      </div>

      {/* Pricing Info */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700">Service Pricing</h3>

        <div className="text-sm text-gray-600">
          <p className="mt-2 font-medium">Main Services:</p>
          <ul>
            {mainServices.map((s, i) => (
              <li key={i}>
                {s.name} — ₱{s.price}
              </li>
            ))}
          </ul>

          <p className="mt-2 font-medium">Add-ons:</p>
          <ul>
            {addOns.map((s, i) => (
              <li key={i}>
                {s.name} — ₱{s.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
