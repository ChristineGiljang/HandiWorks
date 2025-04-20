import React, { useState } from "react";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSignupClick = () => {
    navigate("/signup/pro");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full z-50 top-0 left-0 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2.5 relative">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            HandiWorks
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#hero"
                className="block py-2 px-3 text-gray-900 hover:text-green-700 md:bg-transparent md:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                How it Works
              </a>
            </li>
            <li>
              <a
                href="#categories"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact Us
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
              <a
                onClick={handleLoginClick}
                className="mr-4 block py-2 px-3 text-gray-900 cursor-pointer  hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Login
              </a>
              <Button
                variant="filledStyles"
                text="Join as a Cleaner"
                onClick={handleSignupClick}
              />
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
