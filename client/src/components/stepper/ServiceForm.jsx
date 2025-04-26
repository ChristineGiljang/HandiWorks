import React from "react";

const ServiceForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        businessPhoto: URL.createObjectURL(file),
      }));
    }
  };

  const handleWorkPhotosChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      workPhotos: [...(prev.workPhotos || []), ...newPreviews],
    }));
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">
        Cleaning Business Details
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Provide details about your cleaning business and showcase your work.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* Business Name */}
        <div className="sm:col-span-6">
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-900"
          >
            Name of your cleaning business
          </label>
          <div className="mt-2">
            <input
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 sm:text-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div className="sm:col-span-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="Briefly describe your services and specialties..."
            />
          </div>
        </div>

        {/* Number of Cleaners */}
        <div className="sm:col-span-3">
          <label
            htmlFor="numCleaners"
            className="block text-sm font-medium text-gray-900"
          >
            Number of Cleaners
          </label>
          <div className="mt-2">
            <input
              id="numCleaners"
              name="numCleaners"
              type="number"
              value={formData.numCleaners || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="e.g. 3"
            />
          </div>
        </div>

        {/* Years of Service */}
        <div className="sm:col-span-3">
          <label
            htmlFor="yearsOfService"
            className="block text-sm font-medium text-gray-900"
          >
            Years of Service
          </label>
          <div className="mt-2">
            <input
              id="yearsOfService"
              name="yearsOfService"
              type="number"
              value={formData.yearsOfService || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-2 border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="e.g. 5"
            />
          </div>
        </div>

        {/* Business Photo */}
        <div className="sm:col-span-6">
          <label
            htmlFor="businessPhoto"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Upload photo of yourself or your business
          </label>
          <div className="flex items-center gap-4">
            <div className="w-28 h-24 rounded-full bg-gray-100 overflow-hidden border border-gray-300">
              {formData.businessPhoto ? (
                <img
                  src={formData.businessPhoto}
                  alt="Business"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                  Preview
                </div>
              )}
            </div>
            <input
              id="businessPhoto"
              name="businessPhoto"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
        </div>

        {/* Work Photos */}
        <div className="sm:col-span-6">
          <label
            htmlFor="workPhotos"
            className="block text-sm font-medium text-gray-900"
          >
            Upload photos of your work
          </label>
          <div className="mt-2">
            <input
              id="workPhotos"
              name="workPhotos"
              type="file"
              accept="image/*"
              multiple
              onChange={handleWorkPhotosChange}
              className="block w-full text-sm text-gray-900 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {(formData.workPhotos || []).map((src, index) => (
              <div
                key={index}
                className="w-24 h-24 rounded-md bg-gray-100 overflow-hidden border border-gray-300"
              >
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
