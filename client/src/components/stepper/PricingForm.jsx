import React, { useState, useEffect } from "react";

const mainServiceTypes = ["General Cleaning", "Deep Cleaning"];
const addOnServices = [
  "Bathroom Cleaning",
  "Kitchen Cleaning",
  "Sofa Cleaning",
  "Carpet Cleaning",
  "Window Cleaning",
  "Fridge Cleaning",
];

const PricingForm = ({
  initialMainServices = [],
  initialAddOns = [],
  onSave,
}) => {
  const [mainServices, setMainServices] = useState(initialMainServices);
  const [addOns, setAddOns] = useState(initialAddOns);
  const [isSaving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Initialize with provided values and watch for changes
  useEffect(() => {
    if (initialMainServices.length > 0 || initialAddOns.length > 0) {
      // Convert from database schema format to component format
      const convertedMainServices = initialMainServices.map((service) => ({
        name: service.serviceName || "",
        price: service.price || "",
      }));

      const convertedAddOns = initialAddOns.map((service) => ({
        name: service.serviceName || "",
        price: service.price || "",
      }));

      setMainServices(convertedMainServices);
      setAddOns(convertedAddOns);
    }
  }, [initialMainServices, initialAddOns]);

  const toggleService = (service, list, setList) => {
    const exists = list.some((s) => s.name === service);

    if (exists) {
      // Deselect the service
      setList((prev) => prev.filter((s) => s.name !== service));
    } else {
      // Select the service and add it to the list with the expected structure
      setList((prev) => [
        ...prev,
        {
          name: service,
          price: "",
        },
      ]);
    }
  };

  const updateServicePrice = (index, price, list, setList) => {
    const updated = [...list];
    updated[index].price = price;
    setList(updated);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate that all selected services have prices
    const allMainServicesHavePrices = mainServices.every(
      (service) => service.price !== "" && !isNaN(parseFloat(service.price))
    );

    const allAddOnsHavePrices = addOns.every(
      (service) => service.price !== "" && !isNaN(parseFloat(service.price))
    );

    if (!allMainServicesHavePrices || !allAddOnsHavePrices) {
      setSaveStatus({
        success: false,
        message: "Please set prices for all selected services",
      });
      return;
    }

    try {
      setSaving(true);

      if (typeof onSave === "function") {
        // Format data to match database schema
        const formattedMainServices = mainServices.map((service) => ({
          serviceName: service.name,
          description: "",
          serviceType: "",
          price: parseFloat(service.price),
        }));

        const formattedAddOns = addOns.map((service) => ({
          serviceName: service.name,
          description: "",
          serviceType: "",
          price: parseFloat(service.price),
        }));

        await onSave({
          mainServices: formattedMainServices,
          addOns: formattedAddOns,
        });

        setSaveStatus({ success: true, message: "Prices saved successfully!" });
      } else {
        console.error("onSave is not a function");
        setSaveStatus({
          success: false,
          message: "Error: Save function not provided",
        });
      }
    } catch (error) {
      console.error("Error saving prices:", error);
      setSaveStatus({
        success: false,
        message: "Failed to save prices. Please try again.",
      });
    } finally {
      setSaving(false);
      // Clear status message after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Set Your Service Pricing
      </h2>

      {saveStatus && (
        <div
          className={`mb-4 p-3 rounded-md ${
            saveStatus.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {saveStatus.message}
        </div>
      )}

      <div className="space-y-8">
        {/* MAIN SERVICES */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Main Services
          </label>
          <div className="grid grid-cols-2 gap-3">
            {mainServiceTypes.map((service) => {
              const isSelected = mainServices.some((s) => s.name === service);
              return (
                <div
                  key={service}
                  onClick={() =>
                    toggleService(service, mainServices, setMainServices)
                  }
                  className={`cursor-pointer px-4 py-2 border rounded-md text-sm ${
                    isSelected
                      ? "bg-green-50 border-green-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {service}
                </div>
              );
            })}
          </div>

          {mainServices.length > 0 && (
            <div className="mt-4 space-y-3">
              {mainServices.map((service, index) => (
                <div key={service.name} className="flex items-center gap-4">
                  <span className="w-48 text-sm">{service.name}</span>
                  <input
                    type="number"
                    value={service.price}
                    onChange={(e) =>
                      updateServicePrice(
                        index,
                        e.target.value,
                        mainServices,
                        setMainServices
                      )
                    }
                    placeholder="₱ Price"
                    className="w-full p-2 border rounded-md"
                    min="0"
                    step="0.01"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ADD-ON SERVICES */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Add-ons
          </label>
          <div className="grid grid-cols-2 gap-3">
            {addOnServices.map((service) => {
              const isSelected = addOns.some((s) => s.name === service);
              return (
                <div
                  key={service}
                  onClick={() => toggleService(service, addOns, setAddOns)}
                  className={`cursor-pointer px-4 py-2 border rounded-md text-sm ${
                    isSelected
                      ? "bg-green-50 border-green-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {service}
                </div>
              );
            })}
          </div>

          {addOns.length > 0 && (
            <div className="mt-4 space-y-3">
              {addOns.map((service, index) => (
                <div key={service.name} className="flex items-center gap-4">
                  <span className="w-48 text-sm">{service.name}</span>
                  <input
                    type="number"
                    value={service.price}
                    onChange={(e) =>
                      updateServicePrice(
                        index,
                        e.target.value,
                        addOns,
                        setAddOns
                      )
                    }
                    placeholder="₱ Price"
                    className="w-full p-2 border rounded-md"
                    min="0"
                    step="0.01"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full mt-4 ${
            isSaving ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          } text-white py-2 rounded-md`}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Prices"}
        </button>
      </div>
    </div>
  );
};

export default PricingForm;
