import React from "react";
import Navbar from "./NavBar"; // Adjust the import path as needed

const Layout = ({ children, contactRef }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed navbar at the top */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-800">
        <Navbar contactRef={contactRef} />
      </header>

      {/* Main content with proper padding from the top */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
