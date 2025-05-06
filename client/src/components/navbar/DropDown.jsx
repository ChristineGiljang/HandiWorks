import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ isDropdownOpen, toggleDropdown, userData }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toggleDropdown(); // Close the dropdown
      navigate("/"); // Redirect to home page after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      className={`${
        isDropdownOpen ? "" : "hidden"
      } absolute top-full right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 z-10`}
      id="user-dropdown"
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">
          {userData?.displayName || "User"}
        </span>
        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
          {userData?.email || ""}
        </span>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
          <a
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            onClick={() => toggleDropdown()}
          >
            Profile
          </a>
        </li>
        <li>
          <a
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            onClick={() => toggleDropdown()}
          >
            Settings
          </a>
        </li>
        {userData?.userType === "pro" && (
          <li>
            <a
              href="/earnings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={() => toggleDropdown()}
            >
              Earnings
            </a>
          </li>
        )}
        <li>
          <button
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
