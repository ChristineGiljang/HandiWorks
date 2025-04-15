import React from "react";
import { Home, Building2, Car, Sparkles } from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    {
      label: "Home Cleaning",
      icon: <Home className="w-8 h-8 text-gray-500 mb-2" />,
    },
    {
      label: "Office & Commercial Cleaning",
      icon: <Building2 className="w-8 h-8 text-gray-500 mb-2" />,
    },
    {
      label: "Car Cleaning",
      icon: <Car className="w-8 h-8 text-gray-500 mb-2" />,
    },
    {
      label: "Specialty Cleaning",
      icon: <Sparkles className="w-8 h-8 text-gray-500 mb-2" />,
    },
  ];

  return (
    <section id="categories" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold  mb-8">Explore Cleaning Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className="w-full py-8 px-6 text-lg font-semibold text-gray-800 bg-gray-100 rounded-2xl shadow-md hover:bg-gray-200 transition-all duration-300 flex flex-col items-center justify-center"
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
