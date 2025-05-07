import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../auth/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../navbar/Layout";
import Button from "../ui/Button";
import EditBusinessProfileForm from "./EditBusinessProfileForm";

export default function ServiceManagement() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        // Redirect if not logged in
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchServices = async () => {
      if (!currentUserId) return;

      try {
        const servicesQuery = query(
          collection(db, "services"),
          where("userId", "==", currentUserId)
        );

        const querySnapshot = await getDocs(servicesQuery);
        const servicesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchServices();
    }
  }, [currentUserId]);

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleUpdate = (updatedService) => {
    setServices(
      services.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
    setEditingService(null);
  };

  const confirmDelete = (serviceId) => {
    setDeleteConfirm(serviceId);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleDelete = async (serviceId) => {
    try {
      await deleteDoc(doc(db, "services", serviceId));
      setServices(services.filter((service) => service.id !== serviceId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleCreateNew = () => {
    navigate("/create-service");
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="text-center py-20 text-gray-500">
            Loading your services...
          </div>
        </div>
      </Layout>
    );
  }

  if (editingService) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <EditBusinessProfileForm
            service={editingService}
            onClose={() => setEditingService(null)}
            onUpdate={handleUpdate}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Your Services</h1>
          <Button
            onClick={handleCreateNew}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            text="Create New Service"
          />
        </div>

        {services.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              You haven't added any services yet
            </h2>
            <p className="text-gray-500 mb-6">
              Start by creating your first cleaning service.
            </p>
            <Button
              onClick={handleCreateNew}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
              text="Create Your First Service"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-40">
                  <img
                    src={
                      service.businessInfo?.businessPhoto ||
                      "/default-business-photo.jpg"
                    }
                    alt={service.businessInfo?.businessName || "Business"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1">
                    {service.businessInfo?.businessName || "Unnamed Service"}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {service.businessInfo?.description?.substring(0, 100) ||
                      "No description provided."}
                    {service.businessInfo?.description?.length > 100
                      ? "..."
                      : ""}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.tags?.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {service.tags?.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700">
                        +{service.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/service/${service.id}`)}
                      className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1.5 rounded text-sm"
                      text="View"
                    />
                    <Button
                      onClick={() => handleEdit(service)}
                      className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1.5 rounded text-sm"
                      text="Edit"
                    />
                    <Button
                      onClick={() => confirmDelete(service.id)}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 rounded text-sm"
                      text="Delete"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-3">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this service? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  onClick={cancelDelete}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  text="Cancel"
                />
                <Button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  text="Delete"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
