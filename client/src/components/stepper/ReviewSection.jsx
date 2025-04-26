const ReviewSection = ({
  personalInfo = {},
  businessInfo = {},
  mainServices = [],
  addOns = [],
}) => {
  console.log("ReviewSection Data:", {
    personalInfo,
    businessInfo,
    mainServices,
    addOns,
  });
  const hasPersonalInfo =
    personalInfo?.firstName ||
    personalInfo?.lastName ||
    personalInfo?.email ||
    personalInfo?.phone ||
    personalInfo?.streetAddress;

  const hasBusinessInfo =
    businessInfo?.businessName ||
    businessInfo?.businessPhoto ||
    (Array.isArray(businessInfo?.workPhotos) &&
      businessInfo.workPhotos.length > 0);

  const hasServices = mainServices.length > 0 || addOns.length > 0;

  if (!hasPersonalInfo && !hasBusinessInfo && !hasServices) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
        No review data to show yet.
      </div>
    );
  }
  console.log("ReviewSection props:", {
    personalInfo,
    businessInfo,
    mainServices,
    addOns,
  });
  return (
    <div className="p-6 bg-gray-50 border rounded-md">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Review Information
      </h2>

      {hasPersonalInfo && (
        <div>
          <h3 className="font-semibold text-gray-700">Personal Information</h3>
          <ul className="text-sm text-gray-600 space-y-1 mt-1">
            {personalInfo?.firstName || personalInfo?.lastName ? (
              <li>
                <strong>Name:</strong> {personalInfo?.firstName}{" "}
                {personalInfo?.lastName}
              </li>
            ) : null}
            {personalInfo?.email && (
              <li>
                <strong>Email:</strong> {personalInfo?.email}
              </li>
            )}
            {personalInfo?.phone && (
              <li>
                <strong>Phone:</strong> {personalInfo?.phone}
              </li>
            )}
            {(personalInfo?.streetAddress ||
              personalInfo?.city ||
              personalInfo?.region ||
              personalInfo?.postalCode) && (
              <li>
                <strong>Address:</strong> {personalInfo?.streetAddress},{" "}
                {personalInfo?.city}, {personalInfo?.region},{" "}
                {personalInfo?.postalCode}
              </li>
            )}
          </ul>
        </div>
      )}

      {hasBusinessInfo && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700">Business Information</h3>

          {businessInfo?.businessName && (
            <p className="text-sm text-gray-600">
              <strong>Name:</strong> {businessInfo.businessName}
            </p>
          )}

          {businessInfo?.description && (
            <p className="text-sm text-gray-600 mt-1">
              <strong>Description:</strong> {businessInfo.description}
            </p>
          )}

          {businessInfo?.numCleaners && (
            <p className="text-sm text-gray-600 mt-1">
              <strong>Number of Cleaners:</strong> {businessInfo.numCleaners}
            </p>
          )}

          {businessInfo?.yearsOfService && (
            <p className="text-sm text-gray-600 mt-1">
              <strong>Years of Service:</strong> {businessInfo.yearsOfService}
            </p>
          )}

          {Array.isArray(businessInfo?.workPhotos) &&
            businessInfo.workPhotos.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700">Work Photos</h3>
                <div className="flex gap-2 flex-wrap mt-2">
                  {businessInfo.workPhotos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`Work ${idx + 1}`}
                      className="w-24 h-24 rounded-md object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
        </div>
      )}

      {hasServices && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700">Service Pricing</h3>

          <div className="text-sm text-gray-600">
            {mainServices.length > 0 && (
              <>
                <p className="mt-2 font-medium">Main Services:</p>
                <ul className="list-disc list-inside">
                  {mainServices.map((s, i) => (
                    <li key={i}>
                      {s.name} — ₱{s.price}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {addOns.length > 0 && (
              <>
                <p className="mt-2 font-medium">Add-ons:</p>
                <ul className="list-disc list-inside">
                  {addOns.map((s, i) => (
                    <li key={i}>
                      {s.name} — ₱{s.price}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
