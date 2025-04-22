import { useState, useEffect, useRef } from "react";
import { db, storage } from "../auth/firebase"; // Make sure firebase.js exports storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import NavBarLogo from "../components/navbar/NavBarLogo"; // Assuming you have a NavBarLogo component

function CleanerForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    services: [],
  });

  const [govIDFile, setGovIDFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const serviceCategories = {
    "Home Cleaning": [
      "Studio Cleaning",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
      "Move-In / Move-Out Cleaning",
      "General Deep Clean",
      "Post-Renovation Cleaning",
    ],
    "Specialized Cleaning": [
      "Sofa / Upholstery Cleaning",
      "Mattress Cleaning",
      "Carpet / Rug Cleaning",
      "Grout & Tile Cleaning",
      "Pet Hair & Odor Removal",
    ],
    "Short-Term Rental": [
      "Airbnb Turnover",
      "Guest-Ready Cleaning",
      "Check-Out Clean",
    ],
    Commercial: ["Office Cleaning", "Retail Store Cleaning", "Event Cleanup"],
  };

  const toggleService = (service) => {
    setForm((prev) => {
      const isSelected = prev.services.includes(service);
      return {
        ...prev,
        services: isSelected
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let govIDUrl = "";
      if (govIDFile) {
        const storageRef = ref(
          storage,
          `govIDs/${Date.now()}_${govIDFile.name}`
        );
        await uploadBytes(storageRef, govIDFile);
        govIDUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "cleaners"), {
        ...form,
        govIDUrl,
        createdAt: new Date(),
      });

      setSuccessMsg("Cleaner registration submitted!");
      setForm({
        name: "",
        email: "",
        phone: "",
        location: "",
        services: [],
      });
      setGovIDFile(null);
    } catch (error) {
      console.error("Error saving cleaner data:", error);
    } finally {
      setIsSubmitting(false);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <NavBarLogo />
      <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-500  ">
          Join as a Cleaner in HandiWorks
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Address / Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />

          {/* Multi-select dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="w-full border border-gray-300 rounded-lg p-2 text-left bg-white"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {form.services.length > 0
                ? form.services.join(", ")
                : "Select Cleaning Services"}
            </button>
            {showDropdown && (
              <div className="absolute z-10 bg-white border mt-1 w-full max-h-64 overflow-y-auto rounded-lg shadow-lg">
                {Object.entries(serviceCategories).map(
                  ([category, services]) => (
                    <div key={category} className="p-3 border-b">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        {category}
                      </p>
                      {services.map((service) => (
                        <label
                          key={service}
                          className="flex items-center p-1 hover:bg-gray-50 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={form.services.includes(service)}
                            onChange={() => toggleService(service)}
                            className="mr-2"
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Gov ID upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload Valid Government ID (optional)
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                setGovIDFile(file);
              }}
              className="w-full border border-gray-300 rounded-lg p-2"
            />

            {govIDFile && (
              <div className="mt-2">
                {govIDFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(govIDFile)}
                    alt="Gov ID Preview"
                    className="max-h-48 border rounded-md"
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    Selected file: {govIDFile.name}
                  </p>
                )}
              </div>
            )}
          </div>

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
    </>
  );
}

export default CleanerForm;
