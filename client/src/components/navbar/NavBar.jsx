import React, { useState } from "react";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";
import Button from "../ui/Button";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Example: User's initials and image URL (replace with actual user data)
  const userInitials = "BG";
  const userImage = "/docs/images/people/profile-picture-3.jpg"; // Replace with actual image URL

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 p-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2.5 relative">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            HandiWorks
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-green-700 rounded-sm md:bg-transparent md:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* User or Auth Buttons */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          {isLoggedIn ? (
            <>
              {/* User Avatar */}
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen ? "true" : "false"}
              >
                <span className="sr-only">Open user menu</span>
                {/* Custom Avatar Component */}
                <Avatar image={userImage} initials={userInitials} size="2" />
              </button>

              {/* Render the Dropdown Component */}
              <Dropdown
                isDropdownOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
              />
            </>
          ) : (
            <>
              {/* Login and Sign Up Buttons */}
              <Button href="/login" text="Login" variant="outline" />
              <Button href="/signup" text="Sign Up" variant="filledStyles" />
            </>
          )}
        </div>
      </div>

      {/* Horizontal line below the navbar */}
      <hr className="border-t border-gray-200 dark:border-gray-700" />
    </nav>
  );
};

export default Navbar;
