import { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import Button from "../ui/Button";

export default function BookingForm({ serviceId, clientId }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    notes: "",
  });
  const currentUserId =
    "guest-client-" + Math.random().toString(36).substr(2, 9);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, time, address } = formData;

    if (!date || !time || !address) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const bookingData = {
        serviceId,
        clientId,
        address: formData.address,
        notes: formData.notes,
        status: "pending",
        createdAt: Timestamp.now(),
        scheduledAt: Timestamp.fromDate(
          new Date(`${formData.date}T${formData.time}`)
        ),
      };

      await addDoc(collection(db, "bookings"), bookingData);

      setSuccessMsg("Booking request sent successfully!");
      setFormData({ date: "", time: "", address: "", notes: "" });
    } catch (err) {
      setErrorMsg("Failed to book. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-lg font-semibold">Book this service</h2>

      {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Service Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="Where should the cleaner go?"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Additional Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          rows={3}
          placeholder="e.g. Gate code, cleaning priority..."
        />
      </div>

      <Button
        type="submit"
        text={loading ? "Booking..." : "Book Now"}
        disabled={loading}
        variant="filledStyles"
        className="w-full"
      />
    </form>
  );
}
