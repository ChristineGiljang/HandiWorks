import React, { useState } from "react";

const SearchBar = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cities = [
    "Cebu",
    "Manila",
    "Davao",
    "Quezon City",
    "Taguig",
    "Makati",
    "Baguio",
    "Iloilo",
  ];

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <form className="max-w-3xl mx-auto px-4">
      <div className="flex items-stretch">
        {/* Dropdown Button */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="h-[52px] shrink-0 inline-flex items-center px-4 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          >
            {selectedCity || "Select a city"}
            <svg
              aria-hidden="true"
              className="h-3 ml-2 rotate-180"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 0L0 7h15L7.5 0z"
                fill="black"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              id="dropdown-search-city"
              className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 dark:bg-gray-700 dark:border-gray-600"
            >
              <ul className="py-1 text-sm text-gray-700 dark:text-white max-h-60 overflow-y-auto">
                {cities.map((city) => (
                  <li
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative flex-grow">
          <input
            type="search"
            id="city-search"
            className="block w-full h-[52px] text-sm text-gray-900 border-t border-b border-gray-300 bg-gray-50 px-4 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder={`Try "Home Cleaning" or "Office Cleaning"`}
            value={query}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="h-[52px] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-r-lg text-sm px-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
