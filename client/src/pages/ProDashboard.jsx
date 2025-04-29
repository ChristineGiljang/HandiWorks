import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../auth/firebase";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const ProDashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [service, setService] = useState(null);
  const [loadingService, setLoadingService] = useState(true);
  const [bookings, setBookings] = useState([]);

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
          if (!serviceSnapshot.empty) {
            const serviceData = serviceSnapshot.docs[0].data();
            setService(serviceData);
          }

          // Fetch bookings
          const bookingsQuery = query(
            collection(db, "bookings"),
            where("providerId", "==", user.uid)
          );
          const bookingsSnapshot = await getDocs(bookingsQuery);
          const bookingsList = bookingsSnapshot.docs.map((doc) => doc.data());
          setBookings(bookingsList);
        } catch (error) {
          console.error("Error loading dashboard:", error);
        } finally {
          setLoadingService(false);
        }
      }
    };

    fetchServiceAndBookings();
  }, [user]);

  const completedBookings = bookings.filter((b) => b.status === "completed");
  const totalEarnings = completedBookings.reduce(
    (sum, booking) => sum + (booking.amountPaid || 0),
    0
  );

  if (loading || loadingService) {
    return <div>Loading your dashboard...</div>;
  }

  return (
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
      {/* Recent bookings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        {bookings.length > 0 ? (
          <ul>
            {bookings.slice(0, 5).map((booking, index) => (
              <li key={index} className="border-b py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{booking.clientName}</p>
                    <p className="text-sm text-gray-500">
                      {booking.serviceName}
                    </p>
                  </div>
                  <p className="text-sm">{booking.status}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings yet.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Business Info</h2>
          <Button
            text="Edit"
            variant="outlineStyles"
            onClick={() => navigate("/pro/setup")}
          />
        </div>

        {service?.businessInfo && service?.personalInfo ? (
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

            {/* 🔵 Business Photos */}
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
        ) : (
          <p>No business info found. Please complete your profile.</p>
        )}
      </div>
      {/* Pricing Info */}
      {service?.pricingInfo && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Pricing</h2>
            <Button
              text="Edit"
              variant="outlineStyles"
              onClick={() => navigate("/pro/setup")}
            />
          </div>

          {/* Main Services */}
          {service.pricingInfo.mainServices?.length > 0 && (
            <div className="mt-4 mb-4">
              <h3 className="text-lg font-medium mb-2">Main Services</h3>
              <ul className="space-y-1">
                {service.pricingInfo.mainServices.map((service, idx) => (
                  <li key={idx} className="flex justify-between border-b py-1">
                    <span>{service.name}</span>
                    <span>₱{parseInt(service.price).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add-ons */}
          {service.pricingInfo.addOns?.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Add-ons</h3>
              <ul className="space-y-1">
                {service.pricingInfo.addOns.map((addon, idx) => (
                  <li key={idx} className="flex justify-between border-b py-1">
                    <span>{addon.name}</span>
                    <span>₱{parseInt(addon.price).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProDashboard;
