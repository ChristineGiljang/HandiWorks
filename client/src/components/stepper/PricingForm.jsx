import React, { useState } from "react";

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
  mainServices = [],
  setMainServices = () => {},
  addOns = [],
  setAddOns = () => {},
}) => {
  const toggleService = (service, list, setList) => {
    const exists = list.find((s) => s.name === service);
    if (exists) {
      setList((prev) => prev.filter((s) => s.name !== service));
    } else {
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
    if (mainServices.some((s) => !s.price) || addOns.some((s) => !s.price)) {
      alert("Please set prices for all selected services.");
      return;
    }
    console.log("✅ Main Services:", mainServices);
    console.log("✅ Add-ons:", addOns);
  };

  return (
    <div className="max-w-xl p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">
        Set Your Service Pricing
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Select the services you offer and specify your pricing.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8 mt-6">
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
                  className={`cursor-pointer px-4 py-2 border rounded-md text-sm transition ${
                    isSelected
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "bg-white border-gray-300 hover:border-gray-400"
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
                    placeholder="₱"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ADD-ONS */}
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
                  className={`cursor-pointer px-4 py-2 border rounded-md text-sm transition ${
                    isSelected
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "bg-white border-gray-300 hover:border-gray-400"
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
                    placeholder="₱"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Save Pricing
          </button>
        </div>
      </form>
    </div>
  );
};

export default PricingForm;
