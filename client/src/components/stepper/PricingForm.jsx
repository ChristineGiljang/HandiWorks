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

  const toggleService = (service, list, setList) => {
    const exists = list.some((s) => s.name === service);

    if (exists) {
      // Deselect the service
      setList((prev) => prev.filter((s) => s.name !== service));
    } else {
      // Select the service and add it to the list
      setList((prev) => [...prev, { name: service, price: "" }]);
    }
  };

  const updateServicePrice = (index, price, list, setList) => {
    const updated = [...list];
    updated[index].price = price;
    setList(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === "function") {
      onSave({ mainServices, addOns });
    } else {
      console.error("onSave is not a function");
    }
  };
  useEffect(() => {
    setMainServices(initialMainServices);
    setAddOns(initialAddOns);
  }, []);
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Set Your Service Pricing
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* MAIN SERVICES */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Main Services
          </label>
          <div className="grid grid-cols-2 gap-3">
            {mainServiceTypes.map((service) => {
              const isSelected = mainServices.some((s) => s.name === service);
              return (
                <label
                  key={service}
                  className={`cursor-pointer px-4 py-2 border rounded-md text-sm ${
                    isSelected
                      ? "bg-green-50 border-green-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() =>
                      toggleService(service, mainServices, setMainServices)
                    }
                  />
                  {service}
                </label>
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
                <label
                  key={service}
                  className={`cursor-pointer px-4 py-2 border rounded-md text-sm ${
                    isSelected
                      ? "bg-green-50 border-green-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => toggleService(service, addOns, setAddOns)}
                  />
                  {service}
                </label>
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
          type="submit"
          className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Save Prices
        </button>
      </form>
    </div>
  );
};

export default PricingForm;
