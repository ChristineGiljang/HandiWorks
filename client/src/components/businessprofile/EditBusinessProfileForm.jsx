import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "../ui/Button";

export default function EditBusinessProfileForm({
  service,
  onClose,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    businessInfo: {
      businessName: "",
      description: "",
      yearsOfService: "",
      numCleaners: "",
      businessPhoto: "",
      workPhotos: [],
    },
    pricingInfo: {
      mainServices: [],
    },
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newTag, setNewTag] = useState("");
  const [photoFiles, setPhotoFiles] = useState([]);
  const [businessPhotoFile, setBusinessPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Initialize form with current service data
  useEffect(() => {
    if (service) {
      setFormData({
        businessInfo: {
          businessName: service.businessInfo?.businessName || "",
          description: service.businessInfo?.description || "",
          yearsOfService: service.businessInfo?.yearsOfService || "",
          numCleaners: service.businessInfo?.numCleaners || "",
          businessPhoto: service.businessInfo?.businessPhoto || "",
          workPhotos: service.businessInfo?.workPhotos || [],
        },
        pricingInfo: {
          mainServices: service.pricingInfo?.mainServices || [],
        },
        tags: service.tags || [],
      });
    }
  }, [service]);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const handleAddService = () => {
    if (!newServiceName || !newServicePrice) return;

    const price = parseFloat(newServicePrice);
    if (isNaN(price)) {
      setError("Price must be a valid number");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      pricingInfo: {
        ...prev.pricingInfo,
        mainServices: [
          ...prev.pricingInfo.mainServices,
          { name: newServiceName, price },
        ],
      },
    }));

    setNewServiceName("");
    setNewServicePrice("");
  };

  const handleRemoveService = (index) => {
    setFormData((prev) => ({
      ...prev,
      pricingInfo: {
        ...prev.pricingInfo,
        mainServices: prev.pricingInfo.mainServices.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleAddTag = () => {
    if (!newTag) return;

    if (!formData.tags.includes(newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
    }

    setNewTag("");
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleBusinessPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBusinessPhotoFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkPhotosChange = (e) => {
    if (e.target.files.length) {
      setPhotoFiles([...e.target.files]);
    }
  };

  const uploadPhotos = async () => {
    const storage = getStorage();
    const uploadedUrls = [];

    // Upload work photos
    if (photoFiles.length) {
      for (const file of photoFiles) {
        const fileRef = ref(
          storage,
          `workPhotos/${service.id}/${Date.now()}-${file.name}`
        );
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        uploadedUrls.push(url);
      }
    }

    // Upload business photo if changed
    let businessPhotoUrl = formData.businessInfo.businessPhoto;
    if (businessPhotoFile) {
      const fileRef = ref(
        storage,
        `businessPhotos/${service.id}/${Date.now()}-${businessPhotoFile.name}`
      );
      await uploadBytes(fileRef, businessPhotoFile);
      businessPhotoUrl = await getDownloadURL(fileRef);
    }

    return {
      workPhotoUrls: uploadedUrls,
      businessPhotoUrl,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload any new photos first
      const { workPhotoUrls, businessPhotoUrl } = await uploadPhotos();

      // Prepare the data to update
      const updatedData = {
        ...formData,
        businessInfo: {
          ...formData.businessInfo,
          businessPhoto: businessPhotoUrl,
          workPhotos: [...formData.businessInfo.workPhotos, ...workPhotoUrls],
        },
      };

      // Update the document in Firestore
      const serviceRef = doc(db, "services", service.id);
      await updateDoc(serviceRef, updatedData);

      // Inform parent component about the update
      if (onUpdate) {
        onUpdate({
          id: service.id,
          ...updatedData,
        });
      }

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWorkPhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        workPhotos: prev.businessInfo.workPhotos.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Edit Business Profile</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Business Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessInfo.businessName}
                  onChange={(e) => handleInputChange(e, "businessInfo")}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Service
                </label>
                <input
                  type="number"
                  name="yearsOfService"
                  value={formData.businessInfo.yearsOfService}
                  onChange={(e) => handleInputChange(e, "businessInfo")}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Cleaners
                </label>
                <input
                  type="number"
                  name="numCleaners"
                  value={formData.businessInfo.numCleaners}
                  onChange={(e) => handleInputChange(e, "businessInfo")}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 px-3 py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Description
                </label>
                <textarea
                  name="description"
                  value={formData.businessInfo.description}
                  onChange={(e) => handleInputChange(e, "businessInfo")}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 px-3 py-2"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBusinessPhotoChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {(photoPreview || formData.businessInfo.businessPhoto) && (
                  <div className="mt-2">
                    <img
                      src={photoPreview || formData.businessInfo.businessPhoto}
                      alt="Business"
                      className="h-20 w-20 object-cover rounded-full"
                    />
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Photos (Multiple)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleWorkPhotosChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>

              {/* Display existing work photos */}
              {formData.businessInfo.workPhotos.length > 0 && (
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Current Work Photos
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {formData.businessInfo.workPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Work ${index + 1}`}
                          className="h-24 w-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveWorkPhoto(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Services & Pricing */}
          <div>
            <h3 className="text-lg font-medium mb-3">Services & Pricing</h3>

            <div className="flex items-end gap-2 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 px-3 py-2"
                  placeholder="e.g., Basic House Cleaning"
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₱)
                </label>
                <input
                  type="text"
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 px-3 py-2"
                  placeholder="e.g., 500"
                />
              </div>
              <button
                type="button"
                onClick={handleAddService}
                className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 transition"
              >
                Add
              </button>
            </div>

            {/* Service List */}
            {formData.pricingInfo.mainServices.length > 0 ? (
              <ul className="bg-gray-50 rounded-md p-3 space-y-2">
                {formData.pricingInfo.mainServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>
                      {service.name} - ₱{service.price}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500 text-sm">
                No services added yet.
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-medium mb-3">Service Tags</h3>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 px-3 py-2"
                  placeholder="e.g., Deep Cleaning"
                />
              </div>
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 transition"
              >
                Add Tag
              </button>
            </div>

            {/* Tags List */}
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))}
              {formData.tags.length === 0 && (
                <div className="text-gray-500 text-sm">No tags added yet.</div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-3">
            <Button
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
              text="Cancel"
            />
            <Button
              type="submit"
              disabled={loading}
              className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              text={loading ? "Saving..." : "Save Changes"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
