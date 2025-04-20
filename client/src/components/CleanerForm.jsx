import { useState } from "react";
import { db, storage } from "../auth/firebase"; // Import Firebase setup
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function CleanerForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    govID: null,
  });

  const [govIDPreview, setGovIDPreview] = useState(null); // For file preview
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "govID") {
      setForm((prev) => ({ ...prev, govID: files[0] }));

      // If it's an image, show the preview
      if (files[0] && files[0].type.startsWith("image")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGovIDPreview(reader.result); // Set the preview as base64 URL
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize the URL for the gov ID (empty by default)
      let govIDUrl = "";

      // If a government ID is selected, upload it to Firebase Storage
      if (form.govID) {
        const idRef = ref(storage, `govIDs/${form.govID.name}`);
        await uploadBytes(idRef, form.govID); // Upload the file
        govIDUrl = await getDownloadURL(idRef); // Get the download URL for the uploaded file
      }

      // Save the form data to Firestore
      await addDoc(collection(db, "cleaners"), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        service: form.service,
        govIDUrl, // Save the file URL in Firestore
        createdAt: new Date(),
      });

      setSuccessMsg("Cleaner registration submitted!");
      setForm({
        name: "",
        email: "",
        phone: "",
        location: "",
        service: "",
        govID: null,
      });
      setGovIDPreview(null); // Reset the preview after submission
    } catch (error) {
      console.error("Error saving cleaner data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Join as a Cleaner
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Your Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        >
          <option value="">Select Cleaning Type</option>
          <option>Studio Cleaning</option>
          <option>1 Bedroom</option>
          <option>2 Bedroom</option>
          <option>3 Bedroom</option>
          <option>Move-in / Move-out Cleaning</option>
          <option>General Deep Clean</option>
          <option>Post-Renovation Cleaning</option>
        </select>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Upload Government ID or Valid Photo
          </label>
          <input
            type="file"
            name="govID"
            accept="image/*,application/pdf"
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>

        {/* File Preview */}
        {govIDPreview && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Preview:</h3>
            <img
              src={govIDPreview}
              alt="Government ID Preview"
              className="mt-2 w-full h-auto rounded-lg"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
        {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
      </form>
    </div>
  );
}

export default CleanerForm;
