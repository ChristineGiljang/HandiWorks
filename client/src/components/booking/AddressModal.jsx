import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!street || !city || !postalCode || !region) return;

    const address = { street, city, postalCode, region };
    onSubmit(address);

    localStorage.setItem("userAddress", JSON.stringify(address)); // save to localStorage

    onClose(); // close the modal
    navigate("/services"); // redirect to service list
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Enter Your Address</h2>
        <div className="space-y-4">
          <input
            className="w-full border px-4 py-2 rounded"
            type="text"
            placeholder="Street Address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            className="w-full border px-4 py-2 rounded"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="w-full border px-4 py-2 rounded"
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            className="w-full border px-4 py-2 rounded"
            type="text"
            placeholder="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
