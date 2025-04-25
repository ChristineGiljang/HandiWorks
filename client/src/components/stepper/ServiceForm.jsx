import React, { useState } from "react";

const ServiceForm = () => {
  const [preview, setPreview] = useState(null);
  const [workPreviews, setWorkPreviews] = useState([]);

  // Handle single business photo preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle multiple work photos preview and preserve previous ones
  const handleWorkPhotosChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setWorkPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
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
            htmlFor="business-name"
            className="block text-sm font-medium text-gray-900"
          >
            Name of your cleaning business
          </label>
          <div className="mt-2">
            <input
              id="business-name"
              name="business-name"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-2 border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 sm:text-sm"
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
              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border-2 border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="Briefly describe your services and specialties..."
            />
          </div>
        </div>

        {/* Number of Cleaners and Years of Service */}
        <div className="sm:col-span-3">
          <label
            htmlFor="num-cleaners"
            className="block text-sm font-medium text-gray-900"
          >
            Number of Cleaners
          </label>
          <div className="mt-2">
            <input
              id="num-cleaners"
              name="num-cleaners"
              type="number"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-2 border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="Enter number of cleaners"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="years-of-service"
            className="block text-sm font-medium text-gray-900"
          >
            Years of Service
          </label>
          <div className="mt-2">
            <input
              id="years-of-service"
              name="years-of-service"
              type="number"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-2 border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 sm:text-sm"
              placeholder="Enter number of years in service"
            />
          </div>
        </div>

        {/* Photo of Business or Self */}
        <div className="sm:col-span-6">
          <label
            htmlFor="business-photo"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Upload photo of yourself or photo of the business
          </label>
          <div className="flex items-center gap-4">
            {/* Circle preview */}
            <div className="w-28 h-24 rounded-full bg-gray-100 overflow-hidden border border-gray-300">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                  Preview
                </div>
              )}
            </div>
            <input
              id="business-photo"
              name="business-photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
        </div>

        {/* Upload Photos of Work */}
        <div className="sm:col-span-6">
          <label
            htmlFor="work-photos"
            className="block text-sm font-medium text-gray-900"
          >
            Upload photos of your work
          </label>
          <div className="mt-2">
            <input
              id="work-photos"
              name="work-photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handleWorkPhotosChange}
              className="block w-full text-sm text-gray-900 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
          <div className="mt-4 grid gap-2">
            {/* Render each work photo preview */}
            {workPreviews.map((preview, index) => (
              <div
                key={index}
                className="w-24 h-24 rounded-md bg-gray-100 overflow-hidden border border-gray-300"
              >
                <img
                  src={preview}
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
