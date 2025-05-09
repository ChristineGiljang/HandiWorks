import React from "react";

const ServiceForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          businessPhoto: file, // Save the File
          businessPhotoPreview: reader.result, // Use FileReader for more reliable preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkPhotosChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Process each file with FileReader
      const fileReadPromises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ file, preview: reader.result });
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReadPromises).then((results) => {
        setFormData((prev) => ({
          ...prev,
          workPhotos: [
            ...(prev.workPhotos || []),
            ...files.map((file) => file),
          ],
          workPhotosPreviews: [
            ...(prev.workPhotosPreviews || []),
            ...results.map((result) => result.preview),
          ],
        }));
      });
    }
  };

  const removeWorkPhoto = (index) => {
    setFormData((prev) => {
      const updatedPhotos = [...(prev.workPhotos || [])];
      const updatedPreviews = [...(prev.workPhotosPreviews || [])];

      updatedPhotos.splice(index, 1);
      updatedPreviews.splice(index, 1);

      return {
        ...prev,
        workPhotos: updatedPhotos,
        workPhotosPreviews: updatedPreviews,
      };
    });
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
            <div className="w-28 h-28 rounded-md bg-gray-100 overflow-hidden border border-gray-300">
              {formData.businessPhotoPreview ? (
                <img
                  src={formData.businessPhotoPreview}
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
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {(formData.workPhotosPreviews || []).map((src, index) => (
              <div
                key={index}
                className="relative w-full h-24 rounded-md bg-gray-100 overflow-hidden border border-gray-300 group"
              >
                <img
                  src={src}
                  alt={`Work preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeWorkPhoto(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
