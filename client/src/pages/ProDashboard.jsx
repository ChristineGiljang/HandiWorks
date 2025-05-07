import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../auth/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Layout from "../components/navbar/Layout";

const ProDashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [service, setService] = useState(null);
  const [loadingService, setLoadingService] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [processingBooking, setProcessingBooking] = useState(null);

  // State for editing functionality
  const [isEditingBusinessInfo, setIsEditingBusinessInfo] = useState(false);
  const [isEditingPricing, setIsEditingPricing] = useState(false);
  const [businessInfo, setBusinessInfo] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [pricingInfo, setPricingInfo] = useState({
    mainServices: [],
    addOns: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [serviceId, setServiceId] = useState(null);

  const navigate = useNavigate();

  // 🔵 1st useEffect: redirect if no user
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // 🔵 2nd useEffect: fetch service and bookings
  useEffect(() => {
    const fetchServiceAndBookings = async () => {
      if (user) {
        try {
          // Fetch service info
          const serviceQuery = query(
            collection(db, "services"),
            where("userId", "==", user.uid)
          );
          const serviceSnapshot = await getDocs(serviceQuery);

          let serviceData = null;
          let fetchedServiceId = null;

          if (!serviceSnapshot.empty) {
            const doc = serviceSnapshot.docs[0];
            fetchedServiceId = doc.id;
            serviceData = doc.data();
            setService(serviceData);
            setServiceId(fetchedServiceId);

            // Initialize edit states
            if (serviceData.businessInfo) {
              setBusinessInfo(serviceData.businessInfo);
            }
            if (serviceData.personalInfo) {
              setPersonalInfo(serviceData.personalInfo);
            }
            if (serviceData.pricingInfo) {
              setPricingInfo(serviceData.pricingInfo);
            }
          }

          // Fetch bookings for this specific cleaner
          // There are two ways a booking can be associated with a cleaner:
          // 1. The providerId matches the current user's uid
          // 2. The serviceId matches the cleaner's service

          // First, query by providerId (direct assignment to cleaner)
          const providerBookingsQuery = query(
            collection(db, "bookings"),
            where("providerId", "==", user.uid)
          );

          const providerBookingsSnapshot = await getDocs(providerBookingsQuery);
          let allBookings = providerBookingsSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate
                ? data.createdAt.toDate()
                : new Date(),
              scheduledAt: data.scheduledAt?.toDate
                ? data.scheduledAt.toDate()
                : new Date(),
            };
          });

          // Then, if we have a serviceId, query by serviceId as well
          if (fetchedServiceId) {
            const serviceBookingsQuery = query(
              collection(db, "bookings"),
              where("serviceId", "==", fetchedServiceId)
            );

            const serviceBookingsSnapshot = await getDocs(serviceBookingsQuery);

            // Add these bookings if they're not already in the list (avoid duplicates)
            serviceBookingsSnapshot.docs.forEach((doc) => {
              if (!allBookings.some((b) => b.id === doc.id)) {
                const data = doc.data();
                allBookings.push({
                  id: doc.id,
                  ...data,
                  createdAt: data.createdAt?.toDate
                    ? data.createdAt.toDate()
                    : new Date(),
                  scheduledAt: data.scheduledAt?.toDate
                    ? data.scheduledAt.toDate()
                    : new Date(),
                });
              }
            });
          }

          // Now, fetch client information for each booking to display the client name
          for (let i = 0; i < allBookings.length; i++) {
            const booking = allBookings[i];
            if (booking.clientId && !booking.clientName) {
              try {
                const clientDoc = await getDoc(
                  doc(db, "users", booking.clientId)
                );
                if (clientDoc.exists()) {
                  const clientData = clientDoc.data();
                  allBookings[i] = {
                    ...booking,
                    clientName:
                      clientData.displayName || clientData.email || "Client",
                  };
                }
              } catch (err) {
                console.error("Error fetching client data:", err);
              }
            }
          }

          setBookings(allBookings);
        } catch (error) {
          console.error("Error loading dashboard:", error);
        } finally {
          setLoadingService(false);
        }
      }
    };

    fetchServiceAndBookings();
  }, [user]);

  // Function to handle booking acceptance
  const acceptBooking = async (bookingId) => {
    if (!bookingId || !user) return;

    try {
      setProcessingBooking(bookingId);

      // Reference to the booking document
      const bookingRef = doc(db, "bookings", bookingId);

      // Update the booking status to "confirmed"
      await updateDoc(bookingRef, {
        status: "confirmed",
        confirmedAt: new Date(),
      });

      // Update the local state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "confirmed" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error accepting booking:", error);
    } finally {
      setProcessingBooking(null);
    }
  };

  // Function to format date and time for display
  const formatDateTime = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return "N/A";

    return new Intl.DateTimeFormat("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  // Business info editing functions
  const handleBusinessInfoChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save business info changes
  const saveBusinessInfo = async () => {
    if (!serviceId || !user) return;

    try {
      setIsSaving(true);

      // Reference to the service document
      const serviceRef = doc(db, "services", serviceId);

      // Update the business and personal info
      await updateDoc(serviceRef, {
        businessInfo,
        personalInfo,
      });

      // Update local state
      setService((prev) => ({
        ...prev,
        businessInfo,
        personalInfo,
      }));

      // Exit edit mode
      setIsEditingBusinessInfo(false);
    } catch (error) {
      console.error("Error saving business info:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Pricing editing functions
  const handleMainServiceChange = (index, field, value) => {
    const updatedServices = [...pricingInfo.mainServices];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: field === "price" ? parseFloat(value) : value,
    };

    setPricingInfo((prev) => ({
      ...prev,
      mainServices: updatedServices,
    }));
  };

  const handleAddOnChange = (index, field, value) => {
    const updatedAddOns = [...pricingInfo.addOns];
    updatedAddOns[index] = {
      ...updatedAddOns[index],
      [field]: field === "price" ? parseFloat(value) : value,
    };

    setPricingInfo((prev) => ({
      ...prev,
      addOns: updatedAddOns,
    }));
  };

  const addMainService = () => {
    setPricingInfo((prev) => ({
      ...prev,
      mainServices: [...prev.mainServices, { name: "", price: 0 }],
    }));
  };

  const addAddOn = () => {
    setPricingInfo((prev) => ({
      ...prev,
      addOns: [...prev.addOns, { name: "", price: 0 }],
    }));
  };

  const removeMainService = (index) => {
    setPricingInfo((prev) => ({
      ...prev,
      mainServices: prev.mainServices.filter((_, i) => i !== index),
    }));
  };

  const removeAddOn = (index) => {
    setPricingInfo((prev) => ({
      ...prev,
      addOns: prev.addOns.filter((_, i) => i !== index),
    }));
  };

  // Save pricing changes
  const savePricingInfo = async () => {
    if (!serviceId || !user) return;

    try {
      setIsSaving(true);

      // Reference to the service document
      const serviceRef = doc(db, "services", serviceId);

      // Update the pricing info
      await updateDoc(serviceRef, {
        pricingInfo,
      });

      // Update local state
      setService((prev) => ({
        ...prev,
        pricingInfo,
      }));

      // Exit edit mode
      setIsEditingPricing(false);
    } catch (error) {
      console.error("Error saving pricing info:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const completedBookings = bookings.filter((b) => b.status === "completed");
  const totalEarnings = completedBookings.reduce(
    (sum, booking) => sum + (booking.amountPaid || 0),
    0
  );

  if (loading || loadingService) {
    return <div>Loading your dashboard...</div>;
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        {/* Top greeting section */}
        <div className="flex justify-between items-center mb-8">
          {/* Left: Welcome + photo */}
          <div className="flex items-center gap-4">
            {service?.businessInfo?.businessPhoto && (
              <img
                src={service.businessInfo.businessPhoto}
                alt="Business"
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {service?.personalInfo?.firstName || "Cleaner"}!
              </h1>
              <p className="text-gray-500">Let's get cleaning 🚀</p>
            </div>
          </div>

          {/* Right: Logout button */}
          <Button
            text="Log Out"
            variant="outlineStyles"
            onClick={() => auth.signOut()}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
            <p className="text-3xl">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Completed Jobs</h2>
            <p className="text-3xl">{completedBookings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Earnings (₱)</h2>
            <p className="text-3xl">₱{totalEarnings.toLocaleString()}</p>
          </div>
        </div>

        {/* Upcoming Bookings Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
            <Button
              text="View Calendar"
              onClick={() => navigate("/pro/calendar")}
              variant="outlineStyles"
            />
          </div>

          <div className="mt-2">
            {bookings.filter((b) => b.status === "pending").length > 0 ? (
              <div className="space-y-3">
                {bookings
                  .filter((b) => b.status === "pending")
                  .sort((a, b) => a.scheduledAt - b.scheduledAt)
                  .slice(0, 3)
                  .map((booking, idx) => (
                    <div
                      key={booking.id || idx}
                      className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {booking.clientName || "Client"}
                        </p>
                        <p className="text-sm">{booking.address}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDateTime(booking.scheduledAt)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs mb-2">
                          pending
                        </span>
                        <Button
                          text={
                            processingBooking === booking.id
                              ? "Processing..."
                              : "Accept"
                          }
                          variant="primary"
                          size="sm"
                          onClick={() => acceptBooking(booking.id)}
                          disabled={processingBooking === booking.id}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No upcoming bookings. Bookings made by clients will appear here.
              </p>
            )}
          </div>
        </div>

        {/* Recent bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          {bookings.length > 0 ? (
            <ul>
              {bookings.slice(0, 5).map((booking, index) => (
                <li key={booking.id || index} className="border-b py-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {booking.clientName || "Client"}
                      </p>
                      <p className="text-sm text-gray-500">{booking.address}</p>
                      <div className="text-xs text-gray-400 mt-1">
                        {formatDateTime(booking.scheduledAt)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p
                        className={`text-sm px-2 py-1 rounded ${
                          booking.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.status}
                      </p>
                      {booking.notes && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                          {booking.notes.length > 15
                            ? booking.notes.substring(0, 15) + "..."
                            : booking.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings yet.</p>
          )}
        </div>

        {/* Business Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Business Info</h2>
            {isEditingBusinessInfo ? (
              <div className="space-x-2">
                <Button
                  text="Cancel"
                  variant="outlineStyles"
                  onClick={() => {
                    // Reset to original data
                    setBusinessInfo(service?.businessInfo || {});
                    setPersonalInfo(service?.personalInfo || {});
                    setIsEditingBusinessInfo(false);
                  }}
                />
                <Button
                  text={isSaving ? "Saving..." : "Save Changes"}
                  variant="primary"
                  onClick={saveBusinessInfo}
                  disabled={isSaving}
                />
              </div>
            ) : (
              <Button
                text="Edit Info"
                variant="outlineStyles"
                onClick={() => setIsEditingBusinessInfo(true)}
              />
            )}
          </div>

          {service?.businessInfo && service?.personalInfo ? (
            isEditingBusinessInfo ? (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={businessInfo.businessName || ""}
                      onChange={handleBusinessInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={personalInfo.phone || ""}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={businessInfo.description || ""}
                    onChange={handleBusinessInfoChange}
                    className="w-full px-3 py-2 border rounded-md h-24"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={personalInfo.streetAddress || ""}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={personalInfo.city || ""}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Region
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={personalInfo.region || ""}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={personalInfo.postalCode || ""}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email || ""}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                {/* Note: Photo upload functionality would require additional components */}
                <p className="text-sm text-gray-500 mt-2">
                  Note: To update your business photos, please go to the full
                  setup page.
                </p>
              </div>
            ) : (
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Business Name:</span>{" "}
                    {service.businessInfo.businessName}
                  </p>
                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {service.businessInfo.description}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {`${service.personalInfo.streetAddress}, ${service.personalInfo.city}, ${service.personalInfo.region}, ${service.personalInfo.postalCode}`}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {service.personalInfo.phone}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {service.personalInfo.email}
                  </p>
                </div>

                {/* Business Photos */}
                {service.businessInfo.photos?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Photos & Media</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {service.businessInfo.photos.map((photoUrl, idx) => (
                        <img
                          key={idx}
                          src={photoUrl}
                          alt={`Business Photo ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-md shadow-sm"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          ) : (
            <p>No business info found. Please complete your profile.</p>
          )}
        </div>

        {/* Pricing Info */}
        {service?.pricingInfo && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Pricing</h2>
              {isEditingPricing ? (
                <div className="space-x-2">
                  <Button
                    text="Cancel"
                    variant="outlineStyles"
                    onClick={() => {
                      // Reset to original data
                      setPricingInfo(
                        service?.pricingInfo || {
                          mainServices: [],
                          addOns: [],
                        }
                      );
                      setIsEditingPricing(false);
                    }}
                  />
                  <Button
                    text={isSaving ? "Saving..." : "Save Changes"}
                    variant="primary"
                    onClick={savePricingInfo}
                    disabled={isSaving}
                  />
                </div>
              ) : (
                <Button
                  text="Edit Pricing"
                  variant="outlineStyles"
                  onClick={() => setIsEditingPricing(true)}
                />
              )}
            </div>

            {/* Main Services */}
            {isEditingPricing ? (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Main Services</h3>
                  <Button
                    text="Add Service"
                    variant="outlineStyles"
                    size="sm"
                    onClick={addMainService}
                  />
                </div>

                {pricingInfo.mainServices?.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) =>
                        handleMainServiceChange(idx, "name", e.target.value)
                      }
                      placeholder="Service name"
                      className="flex-grow px-3 py-2 border rounded-md"
                    />
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">₱</span>
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) =>
                          handleMainServiceChange(idx, "price", e.target.value)
                        }
                        placeholder="Price"
                        className="w-24 px-3 py-2 border rounded-md"
                      />
                    </div>
                    <button
                      onClick={() => removeMainService(idx)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* Add-ons */}
                <div className="flex justify-between items-center mt-6 mb-2">
                  <h3 className="text-lg font-medium">Add-ons</h3>
                  <Button
                    text="Add Add-on"
                    variant="outlineStyles"
                    size="sm"
                    onClick={addAddOn}
                  />
                </div>

                {pricingInfo.addOns?.map((addon, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={addon.name}
                      onChange={(e) =>
                        handleAddOnChange(idx, "name", e.target.value)
                      }
                      placeholder="Add-on name"
                      className="flex-grow px-3 py-2 border rounded-md"
                    />
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">₱</span>
                      <input
                        type="number"
                        value={addon.price}
                        onChange={(e) =>
                          handleAddOnChange(idx, "price", e.target.value)
                        }
                        placeholder="Price"
                        className="w-24 px-3 py-2 border rounded-md"
                      />
                    </div>
                    <button
                      onClick={() => removeAddOn(idx)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Main Services display */}
                {pricingInfo.mainServices?.length > 0 && (
                  <div className="mt-4 mb-4">
                    <h3 className="text-lg font-medium mb-2">Main Services</h3>
                    <ul className="space-y-1">
                      {pricingInfo.mainServices.map((service, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between border-b py-1"
                        >
                          <span>{service.name}</span>
                          <span>
                            ₱{parseInt(service.price).toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Add-ons display */}
                {pricingInfo.addOns?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Add-ons</h3>
                    <ul className="space-y-1">
                      {pricingInfo.addOns.map((addon, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between border-b py-1"
                        >
                          <span>{addon.name}</span>
                          <span>₱{parseInt(addon.price).toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProDashboard;
