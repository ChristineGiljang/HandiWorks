import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";
import Button from "../ui/Button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../auth/firebase"; // Adjust if necessary

const Navbar = ({ contactRef }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignupClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate("/signup/pro");
  };

  const handleLoginClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate("/login");
  };
  const handleContactScroll = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  // Navigation links - adjust these as needed for your app
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact", onClick: handleContactScroll },
  ];

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
            setIsLoggedIn(true);
          } else {
            console.log("No user data found");
            // Even if no user data in Firestore, we know they're authenticated
            // So we can use the email from auth
            setUserData({
              email: user.email,
              displayName: user.displayName || user.email.split("@")[0],
            });
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Still use the basic auth info even if Firestore fetch fails
          setUserData({
            email: user.email,
            displayName: user.displayName || user.email.split("@")[0],
          });
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Handiworks
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className="hidden md:flex justify-between items-center w-full md:w-auto md:order-1"
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.onClick ? (
                  <button
                    onClick={link.onClick}
                    className="block py-2 pr-4 pl-3 text-left text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* User Info / Login Buttons */}
        <div className="flex items-center md:order-2 space-x-3 relative">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : isLoggedIn && userData ? (
            <>
              <div className="text-right hidden md:block mr-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {userData.displayName || userData.email}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userData.userType === "pro" ? "Cleaner" : "Client"}
                </p>
              </div>

              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen ? "true" : "false"}
              >
                <span className="sr-only">Open user menu</span>
                <Avatar
                  image={userData.photoURL || null}
                  initials={(userData.displayName || userData.email)
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                  size="2"
                />
              </button>

              <Dropdown
                isDropdownOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
                userData={userData}
              />
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLoginClick}
                className="text-gray-900 cursor-pointer hover:text-green-700 dark:text-white dark:hover:text-green-500"
              >
                Login
              </button>
              <Button
                variant="filledStyles"
                text="Join as a Cleaner"
                onClick={handleSignupClick}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
